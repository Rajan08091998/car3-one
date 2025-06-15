'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, Camera, FileText, CheckCircle, AlertCircle, RotateCcw, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RCData {
  registrationNumber: string;
  ownerName: string;
  vehicleMake: string;
  vehicleModel: string;
  registrationDate: string;
  engineNumber: string;
  chassisNumber: string;
  fuelType: string;
  vehicleClass: string;
  registrationAuthority: string;
  isDoubleSided: boolean;
  confidence: number;
}

interface RCUploadSectionProps {
  onDataExtracted: (data: RCData) => void;
  onError: (error: string) => void;
}

export function RCUploadSection({ onDataExtracted, onError }: RCUploadSectionProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<RCData | null>(null);
  const [rcType, setRcType] = useState<'single' | 'double' | null>(null);
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview' | 'processing' | 'results'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Simulate OCR processing - In production, this would call an actual OCR service
  const simulateOCR = useCallback(async (files: File[]): Promise<RCData> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock extracted data - replace with actual OCR service
    const mockData: RCData = {
      registrationNumber: 'DL01AB1234',
      ownerName: 'JOHN DOE',
      vehicleMake: 'MARUTI SUZUKI',
      vehicleModel: 'SWIFT',
      registrationDate: '2020-03-15',
      engineNumber: 'K12M1234567',
      chassisNumber: 'MA3ERLF1S00123456',
      fuelType: 'PETROL',
      vehicleClass: 'MOTOR CAR',
      registrationAuthority: 'DELHI',
      isDoubleSided: files.length > 1,
      confidence: 0.92
    };

    return mockData;
  }, []);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) {
      onError('Please select valid image files (PNG, JPG) under 10MB');
      return;
    }

    if (validFiles.length > 2) {
      onError('Maximum 2 images allowed for double-sided RC');
      return;
    }

    setUploadedFiles(validFiles);
    setRcType(validFiles.length === 1 ? 'single' : 'double');

    // Create previews
    const previewPromises = validFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then(previews => {
      setPreviews(previews);
      setCurrentStep('preview');
    });
  }, [onError]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const processImages = useCallback(async () => {
    if (uploadedFiles.length === 0) return;

    setCurrentStep('processing');
    setIsProcessing(true);

    try {
      const data = await simulateOCR(uploadedFiles);
      setExtractedData(data);
      setCurrentStep('results');
      onDataExtracted(data);
    } catch (error) {
      onError('Failed to process RC images. Please try again.');
      setCurrentStep('preview');
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFiles, simulateOCR, onDataExtracted, onError]);

  const resetUpload = useCallback(() => {
    setUploadedFiles([]);
    setPreviews([]);
    setExtractedData(null);
    setRcType(null);
    setCurrentStep('upload');
    setIsProcessing(false);
  }, []);

  const removeImage = useCallback((index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    setUploadedFiles(newFiles);
    setPreviews(newPreviews);
    
    if (newFiles.length === 0) {
      resetUpload();
    } else {
      setRcType(newFiles.length === 1 ? 'single' : 'double');
    }
  }, [uploadedFiles, previews, resetUpload]);

  if (currentStep === 'upload') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Registration Certificate</h2>
          <p className="text-gray-600">
            Upload clear photos of your RC. Our AI will automatically extract all vehicle details.
          </p>
        </div>

        {/* Upload Area */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
          <CardContent className="p-12">
            <div
              className="text-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop your RC images here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse files
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm text-gray-500">
                <span>Supports: PNG, JPG up to 10MB each</span>
                <span className="hidden sm:inline">•</span>
                <span>Maximum 2 images for double-sided RC</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="h-16"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileText className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Choose Files</div>
              <div className="text-sm text-gray-500">Browse from device</div>
            </div>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-16"
            onClick={() => cameraInputRef.current?.click()}
          >
            <Camera className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Take Photo</div>
              <div className="text-sm text-gray-500">Use camera</div>
            </div>
          </Button>
        </div>

        {/* RC Type Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">RC Types Supported:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-blue-800">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
              Single-sided RC (1 image)
            </div>
            <div className="flex items-center text-blue-800">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
              Double-sided RC (2 images)
            </div>
          </div>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>
    );
  }

  if (currentStep === 'preview') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Review RC Images</h2>
            <p className="text-gray-600">
              Verify your images are clear and readable before processing
            </p>
          </div>
          <Badge variant={rcType === 'single' ? 'default' : 'secondary'}>
            {rcType === 'single' ? 'Single-sided RC' : 'Double-sided RC'}
          </Badge>
        </div>

        {/* Image Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previews.map((preview, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0 relative">
                <img
                  src={preview}
                  alt={`RC ${rcType === 'double' ? (index === 0 ? 'Front' : 'Back') : 'Image'}`}
                  className="w-full h-64 object-contain bg-gray-50"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">
                    {rcType === 'double' ? (index === 0 ? 'Front Side' : 'Back Side') : 'RC Image'}
                  </Badge>
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Quality Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Image Quality Tips:
          </h4>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Ensure all text is clearly visible and not blurred</li>
            <li>• Avoid shadows or glare on the document</li>
            <li>• Capture the entire RC within the frame</li>
            <li>• Use good lighting for better OCR accuracy</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={processImages}
            size="lg"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="w-5 h-5 mr-2" />
            Process with AI OCR
          </Button>
          <Button
            variant="outline"
            onClick={resetUpload}
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Upload Different Images
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'processing') {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-12 h-12 text-blue-600 animate-pulse" />
            </div>
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Processing RC Images
          </h2>
          <p className="text-gray-600 mb-6">
            Our AI is extracting vehicle details from your RC images. This may take a few moments.
          </p>
          
          <div className="space-y-3 text-sm text-gray-500">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Images uploaded successfully
            </div>
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
              Analyzing document structure
            </div>
            <div className="flex items-center justify-center text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2"></div>
              Extracting text data
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results' && extractedData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Data Extracted Successfully
            </h2>
          </div>
          <p className="text-gray-600">
            AI has extracted the following details from your RC
          </p>
          <div className="mt-2">
            <Badge variant="secondary" className="text-sm">
              Confidence: {Math.round(extractedData.confidence * 100)}%
            </Badge>
          </div>
        </div>

        {/* Extracted Data Display */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Registration Number</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg font-mono text-lg">
                    {extractedData.registrationNumber}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Owner Name</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {extractedData.ownerName}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Vehicle Make</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {extractedData.vehicleMake}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Vehicle Model</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {extractedData.vehicleModel}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Registration Date</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {new Date(extractedData.registrationDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Fuel Type</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {extractedData.fuelType}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Vehicle Class</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {extractedData.vehicleClass}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Registration Authority</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {extractedData.registrationAuthority}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-900 mb-4">Technical Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Engine Number</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg font-mono text-sm">
                    {extractedData.engineNumber}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Chassis Number</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg font-mono text-sm">
                    {extractedData.chassisNumber}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confidence and Accuracy Info */}
        {extractedData.confidence < 0.9 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900">Please Verify Details</h4>
                <p className="text-sm text-amber-800 mt-1">
                  Some details may need verification due to image quality. Please review and correct if necessary.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => {
              // This would typically proceed to the next step in the parent component
              console.log('Proceeding with extracted data:', extractedData);
            }}
            size="lg"
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Use This Data
          </Button>
          <Button
            variant="outline"
            onClick={resetUpload}
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Upload New Images
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
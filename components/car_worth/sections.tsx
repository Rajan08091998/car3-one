'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Upload, CheckCircle, AlertCircle, Calculator, FileText } from 'lucide-react';
import { RCUploadSection } from './RCUploadSection';

interface CarDetails {
  make: string;
  model: string;
  year: string;
  variant: string;
  fuelType: string;
  transmission: string;
  kmDriven: string;
  owners: string;
  location: string;
}

interface RCData {
  registrationNumber: string;
  ownerName: string;
  make: string;
  model: string;
  year: string;
  fuelType: string;
  engineNumber: string;
  chassisNumber: string;
}

interface ValuationResult {
  estimatedValue: number;
  confidenceScore: number;
  marketTrend: 'up' | 'down' | 'stable';
  factors: string[];
}

export function CarWorthSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [carDetails, setCarDetails] = useState<CarDetails>({
    make: '',
    model: '',
    year: '',
    variant: '',
    fuelType: '',
    transmission: '',
    kmDriven: '',
    owners: '',
    location: ''
  });
  const [rcData, setRCData] = useState<RCData | null>(null);
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CarDetails, value: string) => {
    setCarDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleRCDataExtracted = (data: RCData) => {
    setRCData(data);
    // Auto-fill car details from RC data
    setCarDetails(prev => ({
      ...prev,
      make: data.make || prev.make,
      model: data.model || prev.model,
      year: data.year || prev.year,
      fuelType: data.fuelType || prev.fuelType
    }));
  };

  const calculateValuation = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock valuation calculation
    const baseValue = 500000; // Base value in INR
    const yearFactor = Math.max(0.5, 1 - (2024 - parseInt(carDetails.year)) * 0.05);
    const kmFactor = Math.max(0.6, 1 - (parseInt(carDetails.kmDriven) / 100000) * 0.3);
    const ownersFactor = Math.max(0.7, 1 - (parseInt(carDetails.owners) - 1) * 0.1);
    
    const estimatedValue = Math.round(baseValue * yearFactor * kmFactor * ownersFactor);
    
    // Calculate confidence score (higher if RC data is available)
    let confidenceScore = 75;
    if (rcData) confidenceScore += 15;
    if (carDetails.variant) confidenceScore += 5;
    if (carDetails.location) confidenceScore += 5;
    
    const result: ValuationResult = {
      estimatedValue,
      confidenceScore: Math.min(100, confidenceScore),
      marketTrend: 'stable',
      factors: [
        `${2024 - parseInt(carDetails.year)} years old`,
        `${carDetails.kmDriven} km driven`,
        `${carDetails.owners} previous owner(s)`,
        ...(rcData ? ['RC verified'] : [])
      ]
    };
    
    setValuationResult(result);
    setIsLoading(false);
    setCurrentStep(4);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return carDetails.make && carDetails.model && carDetails.year;
      case 2:
        return carDetails.fuelType && carDetails.transmission && carDetails.kmDriven;
      case 3:
        return carDetails.owners && carDetails.location;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What's Your Car Worth?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get an instant, accurate valuation of your vehicle
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-6 h-6 text-blue-600" />
              {currentStep === 1 && "Basic Vehicle Information"}
              {currentStep === 2 && "Vehicle Specifications"}
              {currentStep === 3 && "Usage & Location Details"}
              {currentStep === 4 && "Your Car's Valuation"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about your vehicle's basic details"}
              {currentStep === 2 && "Provide technical specifications"}
              {currentStep === 3 && "Share usage history and location"}
              {currentStep === 4 && "Here's what your car is worth"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Tabs defaultValue="manual" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                    <TabsTrigger value="rc">Upload RC</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="manual" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="make">Make *</Label>
                        <Select value={carDetails.make} onValueChange={(value) => handleInputChange('make', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select make" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                            <SelectItem value="hyundai">Hyundai</SelectItem>
                            <SelectItem value="tata">Tata</SelectItem>
                            <SelectItem value="mahindra">Mahindra</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="model">Model *</Label>
                        <Input
                          id="model"
                          value={carDetails.model}
                          onChange={(e) => handleInputChange('model', e.target.value)}
                          placeholder="Enter model"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="year">Year *</Label>
                        <Select value={carDetails.year} onValueChange={(value) => handleInputChange('year', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="variant">Variant</Label>
                        <Input
                          id="variant"
                          value={carDetails.variant}
                          onChange={(e) => handleInputChange('variant', e.target.value)}
                          placeholder="Enter variant (optional)"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rc">
                    <RCUploadSection onRCDataExtracted={handleRCDataExtracted} />
                    {rcData && (
                      <Alert className="mt-4">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          RC data extracted successfully! Vehicle details have been auto-filled.
                        </AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Step 2: Specifications */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fuelType">Fuel Type *</Label>
                  <Select value={carDetails.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="transmission">Transmission *</Label>
                  <Select value={carDetails.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="amt">AMT</SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="kmDriven">Kilometers Driven *</Label>
                  <Input
                    id="kmDriven"
                    type="number"
                    value={carDetails.kmDriven}
                    onChange={(e) => handleInputChange('kmDriven', e.target.value)}
                    placeholder="Enter kilometers driven"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Usage & Location */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="owners">Number of Previous Owners *</Label>
                  <Select value={carDetails.owners} onValueChange={(value) => handleInputChange('owners', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owners" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Owner</SelectItem>
                      <SelectItem value="2">2nd Owner</SelectItem>
                      <SelectItem value="3">3rd Owner</SelectItem>
                      <SelectItem value="4">4+ Owners</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={carDetails.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Results */}
            {currentStep === 4 && valuationResult && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ₹{valuationResult.estimatedValue.toLocaleString('en-IN')}
                  </div>
                  <p className="text-gray-600">Estimated Market Value</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Confidence Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Progress value={valuationResult.confidenceScore} className="flex-1" />
                        <span className="text-sm font-medium">{valuationResult.confidenceScore}%</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Market Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant={valuationResult.marketTrend === 'up' ? 'default' : 'secondary'}>
                        {valuationResult.marketTrend === 'up' ? '↗ Rising' : 
                         valuationResult.marketTrend === 'down' ? '↘ Declining' : '→ Stable'}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Valuation Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {valuationResult.factors.map((factor, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 3 && (
                <Button
                  onClick={nextStep}
                  disabled={!isStepComplete(currentStep)}
                >
                  Next
                </Button>
              )}
              
              {currentStep === 3 && (
                <Button
                  onClick={calculateValuation}
                  disabled={!isStepComplete(currentStep) || isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Calculator className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      Get Valuation
                    </>
                  )}
                </Button>
              )}
              
              {currentStep === 4 && (
                <Button
                  onClick={() => {
                    setCurrentStep(1);
                    setCarDetails({
                      make: '',
                      model: '',
                      year: '',
                      variant: '',
                      fuelType: '',
                      transmission: '',
                      kmDriven: '',
                      owners: '',
                      location: ''
                    });
                    setRCData(null);
                    setValuationResult(null);
                  }}
                  variant="outline"
                >
                  Start New Valuation
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
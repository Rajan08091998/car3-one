'use client';

import { useState, useMemo, useCallback } from 'react';
import {
    Camera,
    FileText,
    Upload,
    CheckCircle,
    TrendingUp,
    Calendar,
    Fuel,
    Settings,
    Users,
    Shield,
    MapPin,
    ChevronRight
} from 'lucide-react';

// --- Static Data Definitions (Moved outside component for performance) ---
const BRANDS = [
    'RENAULT', 'CITROEN', 'VOLKSWAGEN', 'ASTON MARTIN', 'AUDI', 'BAJAJ', 'BENTLEY', 'BMW', 'BYD',
    'FERRARI', 'FORCE MOTORS', 'HONDA', 'HYUNDAI', 'ISUZU', 'JAGUAR', 'JEEP', 'KIA', 'LAMBORGHINI',
    'LAND ROVER', 'LEXUS', 'LOTUS', 'MAHINDRA', 'MARUTI SUZUKI', 'MASERATI', 'MCLAREN', 'MERCEDES BENZ',
    'MG', 'MINI', 'NISSAN', 'PMV', 'PORSCHE', 'ROLLS ROYCE', 'SKODA', 'TATA', 'TOYOTA', 'VOLVO'
];

const RENAULT_MODELS = ['KIGER', 'KWID', 'TRIBER'];

const COLORS = [
    'Green', 'Blue', 'Black', 'Orange', 'Silver', 'Pink', 'Yellow', 'Red',
    'Beige', 'Purple', 'White', 'Brown', 'Burgundy'
];

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

const YEARS = Array.from({ length: 15 }, (_, i) => 2024 - i);

// --- Reusable Sub-components (Examples) ---

// Component for the selection cards
interface SelectionCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    onClick: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ icon: Icon, title, description, onClick }) => (
    <div
        className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200"
        onClick={onClick}
    >
        <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center justify-center text-blue-600 font-medium">
                Select This Option <ChevronRight className="w-4 h-4 ml-1" />
            </div>
        </div>
    </div>
);

// Component for displaying key vehicle details in results
interface DetailCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon: Icon, label, value }) => (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
        <Icon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
);

// --- Main CarWorthSection Component ---
export function CarWorthSection() {
    const [currentStep, setCurrentStep] = useState('selection'); // 'selection', 'form', 'results'
    const [valuationType, setValuationType] = useState<'upload' | 'manual' | ''>('');
    const [formData, setFormData] = useState({
        registrationYear: '',
        registrationMonth: '',
        brand: '',
        model: '',
        exteriorColor: '',
        kmDriven: '',
        firstOwner: '',
        location: ''
    });
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [valuationData, setValuationData] = useState<any>(null); // Type this more specifically when API response is known
    const [showCertification, setShowCertification] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newForm = { ...prev, [name]: value };
            // Reset model if brand changes and is not Renault
            if (name === 'brand' && value !== 'RENAULT') {
                newForm.model = '';
            }
            return newForm;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send formData and uploadedFile to an API here.
        // For now, we simulate the API response.
        const simulatedValuation = {
            type: valuationType,
            formData,
            hasFile: !!uploadedFile,
            // Dummy data for results, replace with actual API response structure
            estimatedValue: {
                base: 450000,
                min: 382500, // 450000 * 0.85
                max: 517500  // 450000 * 1.15
            },
            marketCondition: 'Good',
            daysToSell: 45,
            demand: 'High',
            priceFactors: [
                { name: 'Vehicle Age', impact: -8, type: 'negative' },
                { name: 'Low Mileage', impact: +5, type: 'positive' },
                { name: 'Single Owner', impact: +3, type: 'positive' },
                { name: 'Market Trend', impact: +2, type: 'positive' }
            ],
            locationImpact: {
                locationName: formData.location || 'Delhi',
                amount: 15000,
                type: 'positive'
            },
            // Dummy vehicle details
            fuelType: 'Petrol',
            transmissionType: 'Manual'
        };
        setValuationData(simulatedValuation);
        setCurrentStep('results');
    };

    // Memoize this function to prevent unnecessary recreations
    const getAvailableModels = useCallback(() => {
        if (formData.brand === 'RENAULT') {
            return RENAULT_MODELS;
        }
        return [];
    }, [formData.brand]); // Dependency on formData.brand

    const handleCertification = () => {
        setShowCertification(true);
    };

    const handleProceedToListing = () => {
        // In a real app, this would navigate to a sell tab or listing page
        alert('Proceeding to listing options...');
    };

    const resetFormAndStep = useCallback(() => {
        setCurrentStep('selection');
        setValuationType('');
        setFormData({
            registrationYear: '',
            registrationMonth: '',
            brand: '',
            model: '',
            exteriorColor: '',
            kmDriven: '',
            firstOwner: '',
            location: ''
        });
        setUploadedFile(null);
        setValuationData(null);
        setShowCertification(false); // Reset certification modal state
    }, []); // No dependencies, can be memoized once

    // --- Conditional Rendering based on currentStep ---
    if (currentStep === 'selection') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What&apos;s My Car Worth?
                    </h1>
                    <p className="text-xl text-gray-600">
                        Get accurate AI-powered valuation of your vehicle
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <SelectionCard
                        icon={Camera}
                        title="Upload RC Photo"
                        description="Quick and easy - just upload your registration certificate photo"
                        onClick={() => {
                            setValuationType('upload');
                            setCurrentStep('form');
                        }}
                    />
                    <SelectionCard
                        icon={FileText}
                        title="Manual Entry"
                        description="Fill out the form manually with your vehicle details"
                        onClick={() => {
                            setValuationType('manual');
                            setCurrentStep('form');
                        }}
                    />
                </div>
            </div>
        );
    }

    if (currentStep === 'form') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="mb-6">
                        <button
                            onClick={resetFormAndStep} // Using the memoized reset function
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            ← Back to options
                        </button>
                    </div>

                    {valuationType === 'upload' ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6">Upload Registration Certificate</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Upload your RC document
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        PNG, JPG up to 10MB. AI will extract all vehicle details automatically.
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="file-upload"
                                        required
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
                                    >
                                        Choose File
                                    </label>
                                    {uploadedFile && (
                                        <p className="mt-4 text-green-600 font-medium">
                                            ✓ {uploadedFile.name} uploaded successfully
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={!uploadedFile}
                                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    Analyze RC with AI & Get Valuation
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-6">Vehicle Details</h2>
                            <p className="text-gray-600 mb-8">AI will analyze your inputs to provide accurate market valuation</p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Vehicle Registration Date */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Registration Date</h3>
                                    <p className="text-gray-600 mb-4">What is your vehicle&apos;s year of first registration?</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="registrationYear" className="block text-sm font-medium text-gray-700 mb-2">
                                                Registration Year *
                                            </label>
                                            <select
                                                id="registrationYear" // Added ID for accessibility
                                                name="registrationYear"
                                                value={formData.registrationYear}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Year</option>
                                                {YEARS.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="registrationMonth" className="block text-sm font-medium text-gray-700 mb-2">
                                                Registration Month *
                                            </label>
                                            <select
                                                id="registrationMonth" // Added ID for accessibility
                                                name="registrationMonth"
                                                value={formData.registrationMonth}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Month</option>
                                                {MONTHS.map(month => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Brand Selection */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Brand Selection</h3>
                                    <p className="text-gray-600 mb-4">Select your vehicle brand</p>

                                    <select
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Brand</option>
                                        {BRANDS.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Vehicle Model Selection */}
                                {formData.brand === 'RENAULT' && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Model Selection</h3>
                                        <p className="text-gray-600 mb-4">Select your vehicle model</p>

                                        <select
                                            name="model"
                                            value={formData.model}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Model</option>
                                            {getAvailableModels().map(model => (
                                                <option key={model} value={model}>{model}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Exterior Colour Selection */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Exterior Colour Selection</h3>
                                    <p className="text-gray-600 mb-4">Choose an exterior colour closest to your vehicle</p>

                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                        {COLORS.map(color => (
                                            <label key={color} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="exteriorColor"
                                                    value={color}
                                                    checked={formData.exteriorColor === color}
                                                    onChange={handleInputChange}
                                                    className="sr-only"
                                                    required
                                                />
                                                <div className={`p-3 text-center border-2 rounded-lg transition-colors ${formData.exteriorColor === color
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}>
                                                    <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${color === 'Black' ? 'bg-black' :
                                                        color === 'White' ? 'bg-white border border-gray-300' :
                                                            color === 'Red' ? 'bg-red-500' :
                                                                color === 'Blue' ? 'bg-blue-500' :
                                                                    color === 'Green' ? 'bg-green-500' :
                                                                        color === 'Yellow' ? 'bg-yellow-400' :
                                                                            color === 'Orange' ? 'bg-orange-500' :
                                                                                color === 'Purple' ? 'bg-purple-500' :
                                                                                    color === 'Pink' ? 'bg-pink-400' :
                                                                                        color === 'Brown' ? 'bg-amber-800' :
                                                                                            color === 'Burgundy' ? 'bg-red-800' :
                                                                                                color === 'Beige' ? 'bg-yellow-100 border border-gray-300' :
                                                                                                    'bg-gray-400'
                                                        }`}></div>
                                                    <span className="text-xs font-medium">{color}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Vehicle Usage Details */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Usage Details</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="kmDriven" className="block text-sm font-medium text-gray-700 mb-2">
                                                How many kilometres has your vehicle covered? *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="kmDriven" // Added ID for accessibility
                                                    type="number"
                                                    name="kmDriven"
                                                    value={formData.kmDriven}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                                                    placeholder="25000"
                                                />
                                                <span className="absolute right-3 top-3 text-gray-500">km</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                                Are you the first owner of your vehicle? *
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="firstOwner"
                                                        value="Yes"
                                                        checked={formData.firstOwner === 'Yes'}
                                                        onChange={handleInputChange}
                                                        className="sr-only"
                                                        required
                                                    />
                                                    <div className={`p-4 text-center border-2 rounded-lg transition-colors ${formData.firstOwner === 'Yes'
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                        }`}>
                                                        <span className="font-medium">Yes</span>
                                                    </div>
                                                </label>

                                                <label className="cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="firstOwner"
                                                        value="No"
                                                        checked={formData.firstOwner === 'No'}
                                                        onChange={handleInputChange}
                                                        className="sr-only"
                                                        required
                                                    />
                                                    <div className={`p-4 text-center border-2 rounded-lg transition-colors ${formData.firstOwner === 'No'
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                        }`}>
                                                        <span className="font-medium">No</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dealership Location */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dealership Location</h3>
                                    <p className="text-gray-600 mb-4">Locate the nearest dealership</p>

                                    <div className="flex gap-3">
                                        <div className="flex-1 relative">
                                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your address or location"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                            onClick={() => alert('Geolocation feature not implemented yet!')} // Added an alert for dummy functionality
                                        >
                                            Around Me
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                                >
                                    Get AI Valuation Analysis
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (currentStep === 'results' && valuationData) {
        // Derived values based on dummy data, will be replaced by API data
        const { estimatedValue, priceFactors, locationImpact } = valuationData;

        return (
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="w-12 h-12 text-green-500 mr-3" />
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Valuation Complete
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600">
                        AI-powered analysis of {valuationData.type === 'upload' ? 'your RC document' : 'vehicle details'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Valuation Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Estimated Value</h2>
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                                    <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                                        ₹{estimatedValue.min.toLocaleString()} - ₹{estimatedValue.max.toLocaleString()}
                                    </div>
                                    <p className="text-blue-700 font-medium">Market Value Range</p>
                                </div>
                            </div>

                            {/* Vehicle Details */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <DetailCard icon={Calendar} label="Year" value={valuationData.formData.registrationYear || 'N/A'} />
                                <DetailCard icon={Fuel} label="Fuel" value={valuationData.fuelType || 'N/A'} />
                                <DetailCard icon={Settings} label="Transmission" value={valuationData.transmissionType || 'N/A'} />
                                <DetailCard icon={Users} label="Owners" value={valuationData.formData.firstOwner === 'Yes' ? '1st' : '2nd+'} />
                            </div>

                            {/* Market Analysis */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                                    Market Analysis
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 border rounded-lg">
                                        <p className={`text-2xl font-bold ${valuationData.marketCondition === 'Good' ? 'text-green-600' : 'text-gray-900'}`}>
                                            {valuationData.marketCondition}
                                        </p>
                                        <p className="text-sm text-gray-600">Market Condition</p>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg">
                                        <p className="text-2xl font-bold text-blue-600">{valuationData.daysToSell}</p>
                                        <p className="text-sm text-gray-600">Days to Sell</p>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg">
                                        <p className={`text-2xl font-bold ${valuationData.demand === 'High' ? 'text-orange-600' : 'text-gray-900'}`}>
                                            {valuationData.demand}
                                        </p>
                                        <p className="text-sm text-gray-600">Demand</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={handleCertification}
                                className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors"
                            >
                                <Shield className="w-8 h-8 mx-auto mb-3" />
                                <h3 className="text-lg font-semibold mb-2">Get Certification</h3>
                                <p className="text-green-100 text-sm">Increase value with professional report</p>
                                <p className="text-lg font-bold mt-2">₹2,999</p>
                            </button>

                            <button
                                onClick={handleProceedToListing}
                                className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <Users className="w-8 h-8" />
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">List Your Car</h3>
                                <p className="text-blue-100 text-sm">Connect with dealers or marketplace</p>
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Confidence Score */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold mb-4">Confidence Score</h3>
                            <div className="flex items-center mb-4">
                                <div className="flex-1 bg-gray-200 rounded-full h-3">
                                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                                <span className="ml-3 text-lg font-bold text-green-600">92%</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                High confidence based on market data and vehicle condition
                            </p>
                        </div>

                        {/* Factors Affecting Price */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold mb-4">Price Factors</h3>
                            <div className="space-y-3">
                                {priceFactors.map((factor: any) => ( // Type this properly based on API response
                                    <div key={factor.name} className="flex justify-between items-center">
                                        <span className="text-sm">{factor.name}</span>
                                        <span className={`text-sm font-medium ${factor.type === 'negative' ? 'text-red-600' : 'text-green-600'}`}>
                                            {factor.impact > 0 ? `+${factor.impact}%` : `${factor.impact}%`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location Impact */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2" />
                                Location Impact
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {locationImpact.locationName}
                            </p>
                            <p className={`text-sm font-medium ${locationImpact.type === 'positive' ? 'text-green-600' : 'text-gray-600'}`}>
                                {locationImpact.type === 'positive' ? `+₹${locationImpact.amount.toLocaleString()}` : `-₹${locationImpact.amount.toLocaleString()}`} above national average
                            </p>
                        </div>
                    </div>
                </div>

                {/* Certification Modal */}
                {showCertification && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-md w-full p-6">
                            <h3 className="text-xl font-bold mb-4">Vehicle Certification</h3>
                            <div className="space-y-4 mb-6">
                                {/* Consider mapping an array of features here too */}
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span className="text-sm">Professional inspection report</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span className="text-sm">Increase buyer confidence</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span className="text-sm">Higher selling price potential</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span className="text-sm">Legal documentation support</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCertification(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    Pay ₹2,999
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Back to Start Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={resetFormAndStep} // Using the memoized reset function
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Start New Valuation
                    </button>
                </div>
            </div>
        );
    }

    return null; // Should ideally not reach here if currentStep is managed correctly
}
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Users, 
  Clock, 
  IndianRupee, 
  CheckCircle, 
  ArrowRight,
  Camera,
  FileText,
  Star,
  Shield,
  TrendingUp,
  Phone,
  Award,
  HeartHandshake,
  Banknote,
  UserCheck,
  MapPin,
  Navigation
} from 'lucide-react';

interface SellCarOptionsProps {
  valuationData?: {
    minValue: number;
    maxValue: number;
    vehicleDetails: any;
  };
}

const SellCarOptions: React.FC<SellCarOptionsProps> = ({ valuationData }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<'dealer' | 'private' | 'sellyourcars' | ''>('');
  const [activeTab, setActiveTab] = useState<'why' | 'price' | 'time' | 'process' | 'start'>('why');
  const [userLocation, setUserLocation] = useState('Delhi NCR');

  // Quick Sell (Dealer) Benefits
  const dealerBenefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Sale",
      description: "Get cash in hand within 24-48 hours"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Zero Paperwork Hassle",
      description: "We handle all RC transfer and documentation"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Guaranteed Purchase",
      description: "No deal cancellations or payment delays"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Trusted Network",
      description: "Verified dealers across 200+ cities in India"
    }
  ];

  // List Your Car (Private Sale) Benefits
  const privateBenefits = [
    {
      icon: <IndianRupee className="w-6 h-6" />,
      title: "Free to list",
      description: "You can post an ad for free to our marketplace, with the option of upgrading your listing to promote it."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Reach the largest audience",
      description: "As the largest marketplace in India, your ad will reach millions of users to potentially inquire about your car."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "List it in minutes",
      description: "In 3 simple steps, you can list an ad on the marketplace. Then, all you'll have to do is sit back and relax."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Sell it at a retail price",
      description: "Set your own price tag with the help of our pricing tool and sell directly to consumers."
    }
  ];

  // NEW: SellYourCars Benefits
  const sellYourCarsBenefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Service",
      description: "White-glove selling experience with dedicated support throughout the entire process."
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Personal Car Advisor",
      description: "Get matched with a personal advisor who handles everything from listing to final sale."
    },
    {
      icon: <Banknote className="w-6 h-6" />,
      title: "Maximum Value Guarantee",
      description: "We ensure you get the highest possible price through our advanced marketing strategies."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Verified Buyer Network",
      description: "Access to our exclusive network of pre-verified, serious buyers ready to purchase."
    }
  ];

  const sellingProcess = [
    {
      step: 1,
      title: "Take photos of your car",
      description: "Provide clear interior and exterior photos of your car in good lighting.",
      icon: <Camera className="w-8 h-8" />
    },
    {
      step: 2,
      title: "Determine Make Model Trim",
      description: "Have the year, make, model, and trim of your car ready before you begin.",
      icon: <FileText className="w-8 h-8" />
    },
    {
      step: 3,
      title: "Set your location and price",
      description: "Choose your city/area and find the average market value of your car to sell privately.",
      icon: <MapPin className="w-8 h-8" />
    },
    {
      step: 4,
      title: "Add your car details",
      description: "Include customizations, condition of the vehicle or any other special notes of interest.",
      icon: <Phone className="w-8 h-8" />
    }
  ];

  // NEW: SellYourCars Process
  const sellYourCarsProcess = [
    {
      step: 1,
      title: "Schedule Professional Inspection",
      description: "Our certified inspectors visit your location for a comprehensive 200-point inspection.",
      icon: <Shield className="w-8 h-8" />
    },
    {
      step: 2,
      title: "Professional Photography",
      description: "High-quality photos and 360° virtual tour created by our professional photographers.",
      icon: <Camera className="w-8 h-8" />
    },
    {
      step: 3,
      title: "Premium Listing Creation",
      description: "Your car gets featured across multiple premium platforms with optimized descriptions.",
      icon: <Star className="w-8 h-8" />
    },
    {
      step: 4,
      title: "Buyer Management & Sale",
      description: "We handle all buyer inquiries, negotiations, and paperwork until the final sale.",
      icon: <HeartHandshake className="w-8 h-8" />
    }
  ];

  const majorCities = [
    'Delhi NCR', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  const handleDealerSale = () => {
    router.push('/sell/dealer-network');
  };

  const handlePrivateListing = () => {
    router.push('/sell/create-listing');
  };

  const handleSellYourCars = () => {
    router.push('/sell/premium-service');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'why':
        if (selectedOption === 'sellyourcars') {
          return (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why choose our premium SellYourCars service?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {sellYourCarsBenefits.map((benefit, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="text-purple-600 mt-1">{benefit.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-xl mb-3">{benefit.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location-based Premium Service Availability */}
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center mb-4">
                  <Navigation className="w-6 h-6 text-purple-600 mr-3" />
                  <h4 className="font-bold text-purple-800 text-lg">Available in Your Area</h4>
                </div>
                <p className="text-purple-700 mb-4">
                  Our premium SellYourCars service is available in {userLocation} and surrounding areas.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {majorCities.map((city) => (
                    <span
                      key={city}
                      className={`text-xs px-2 py-1 rounded ${
                        city === userLocation 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Consider the benefits of selling privately!</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {privateBenefits.map((benefit, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-blue-600 mt-1">{benefit.icon}</div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-xl mb-3">{benefit.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location-based Market Insights */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h4 className="font-bold text-blue-800 text-lg">Market Insights for {userLocation}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">50L+</div>
                  <p className="text-sm text-blue-700">Monthly visitors in your area</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">15-25</div>
                  <p className="text-sm text-blue-700">Average days to sell</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">₹25K+</div>
                  <p className="text-sm text-blue-700">Premium over national avg</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'price':
        if (selectedOption === 'sellyourcars') {
          return (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Premium service pricing</h3>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Our SellYourCars service ensures you get the maximum possible value for your vehicle.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  With professional marketing, dedicated support, and our verified buyer network, cars typically sell for 15-20% more than standard private listings.
                </p>
                {valuationData && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">Dealer Price</h4>
                      <p className="text-3xl font-bold text-orange-600 mb-2">
                        ₹{Math.round(valuationData.minValue * 0.85).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Quick sale, lower price</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">Private Sale</h4>
                      <p className="text-3xl font-bold text-blue-600 mb-2">
                        ₹{valuationData.maxValue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Standard market value</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">SellYourCars Premium</h4>
                      <p className="text-3xl font-bold text-purple-600 mb-2">
                        ₹{Math.round(valuationData.maxValue * 1.18).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Maximum premium value</p>
                    </div>
                  </div>
                )}
                <div className="bg-purple-100 p-6 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-800 font-semibold text-lg">Service Fee: ₹9,999</p>
                      <p className="text-purple-700 text-sm">Only charged after successful sale</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-800 font-semibold">Available in {userLocation}</p>
                      <p className="text-purple-700 text-sm">Home inspection included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">How much can I sell for?</h3>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                When you sell directly to a private buyer, you are in control of the price.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We highly recommend reviewing the prices of similar cars on Car3.one Marketplace and using it as guidance to help you price your car at a competitive rate.
              </p>
              {valuationData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Dealer Price</h4>
                    <p className="text-3xl font-bold text-orange-600 mb-2">
                      ₹{Math.round(valuationData.minValue * 0.85).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Quick sale, lower price</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-green-200 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Private Sale Price</h4>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      ₹{valuationData.maxValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Maximum market value</p>
                  </div>
                </div>
              )}
              <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-800 font-semibold text-lg">Location Advantage: {userLocation}</p>
                    <p className="text-blue-700 text-sm">Metro cities typically have higher resale values</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-800 font-semibold">+₹25,000</p>
                    <p className="text-blue-700 text-sm">Above national average</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'time':
        if (selectedOption === 'sellyourcars') {
          return (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">How long does it take?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 bg-orange-50 rounded-xl border border-orange-200">
                  <Building2 className="w-16 h-16 text-orange-600 mx-auto mb-6" />
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Sell to Dealer</h4>
                  <div className="text-6xl font-bold text-orange-600 mb-4">1-2</div>
                  <div className="text-xl font-semibold text-orange-600 mb-2">Days</div>
                  <p className="text-sm text-gray-600">Instant cash, quick process</p>
                </div>
                <div className="text-center p-8 bg-blue-50 rounded-xl border border-blue-200">
                  <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Private Sale</h4>
                  <div className="text-6xl font-bold text-blue-600 mb-4">15-30</div>
                  <div className="text-xl font-semibold text-blue-600 mb-2">Days</div>
                  <p className="text-sm text-gray-600">Average time for private sales</p>
                </div>
                <div className="text-center p-8 bg-purple-50 rounded-xl border border-purple-200">
                  <Award className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                  <h4 className="text-xl font-bold text-gray-900 mb-4">SellYourCars Premium</h4>
                  <div className="text-6xl font-bold text-purple-600 mb-4">7-14</div>
                  <div className="text-xl font-semibold text-purple-600 mb-2">Days</div>
                  <p className="text-sm text-gray-600">Faster with premium marketing</p>
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-600 mr-3" />
                  <h4 className="font-bold text-purple-800 text-lg">Location-Based Timeline for {userLocation}</h4>
                </div>
                <p className="text-purple-700 mb-4">
                  <strong>Premium Advantage:</strong> Our dedicated marketing and verified buyer network in {userLocation} typically results in faster sales at higher prices!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-purple-800">Professional Photography</p>
                    <p className="text-sm text-purple-700">Same-day service in {userLocation}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-purple-800">Buyer Network</p>
                    <p className="text-sm text-purple-700">500+ verified buyers in your area</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">How long does it take?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center p-8 bg-blue-50 rounded-xl border border-blue-200">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-gray-900 mb-4">Car3.one Marketplace</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">With Car3.one Marketplace, you could sell your car in:</p>
                <div className="text-6xl font-bold text-blue-600 mb-4">15-30</div>
                <div className="text-xl font-semibold text-blue-600">Days</div>
              </div>
              <div className="text-center p-8 bg-orange-50 rounded-xl border border-orange-200">
                <Building2 className="w-16 h-16 text-orange-600 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-gray-900 mb-4">Sell to Dealer</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">Compared to selling to a dealer that will take an average of:</p>
                <div className="text-6xl font-bold text-orange-600 mb-4">1-2</div>
                <div className="text-xl font-semibold text-orange-600">Days</div>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h4 className="font-bold text-blue-800 text-lg">Market Activity in {userLocation}</h4>
              </div>
              <p className="text-blue-700 mb-4">
                <strong>Pro Tip:</strong> Premium listings with professional photos sell 40% faster in {userLocation}!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">2.5L+</div>
                  <p className="text-sm text-blue-700">Active buyers in your area</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
                  <p className="text-sm text-blue-700">Successful sales rate</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">18</div>
                  <p className="text-sm text-blue-700">Average days to sell</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'process':
        if (selectedOption === 'sellyourcars') {
          return (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">What is the premium process?</h3>
              </div>
              <div className="space-y-6">
                {sellYourCarsProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-6 p-6 bg-purple-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-2xl">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-3 text-xl">{step.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="text-purple-600 flex-shrink-0">{step.icon}</div>
                  </div>
                ))}
              </div>
              <div className="bg-purple-100 p-8 rounded-xl border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-4 text-xl">Premium service includes:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-purple-700 space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-purple-600" />
                      Dedicated personal car advisor throughout the process
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-purple-600" />
                      Professional 200-point inspection and certification
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-purple-600" />
                      Premium listing on multiple high-traffic platforms
                    </li>
                  </ul>
                  <ul className="text-purple-700 space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-purple-600" />
                      Complete buyer screening and negotiation management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-purple-600" />
                      Full legal documentation and RC transfer support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-purple-600" />
                      Home service available in {userLocation}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What is the process?</h3>
            </div>
            <div className="space-y-6">
              {sellingProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-6 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-3 text-xl">{step.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="text-blue-600 flex-shrink-0">{step.icon}</div>
                </div>
              ))}
            </div>
            <div className="bg-green-50 p-8 rounded-xl border border-green-200">
              <h4 className="font-bold text-green-800 mb-4 text-xl">List your ad and start managing your leads!</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-green-700 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    Get instant buyer inquiries via call/WhatsApp
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    Schedule test drives at your convenience
                  </li>
                </ul>
                <ul className="text-green-700 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    We provide legal documentation support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    Complete RC transfer assistance in {userLocation}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'start':
        if (selectedOption === 'sellyourcars') {
          return (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Ready to get started?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-orange-50 rounded-xl border border-orange-200 text-center">
                  <Building2 className="w-16 h-16 text-orange-600 mx-auto mb-6" />
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Sell to Dealer</h4>
                  <ul className="text-gray-600 space-y-3 mb-6 text-left">
                    <li>• Instant cash payment</li>
                    <li>• Zero paperwork hassle</li>
                    <li>• Guaranteed purchase</li>
                    <li>• 200+ verified dealers</li>
                  </ul>
                  <button
                    onClick={handleDealerSale}
                    className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg"
                  >
                    Connect with Dealers
                  </button>
                </div>
                
                <div className="p-8 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <h4 className="text-xl font-bold text-gray-900 mb-4">List Privately</h4>
                  <ul className="text-gray-600 space-y-3 mb-6 text-left">
                    <li>• Get maximum market price</li>
                    <li>• Reach 50L+ monthly visitors</li>
                    <li>• Free listing with premium options</li>
                    <li>• Direct buyer communication</li>
                  </ul>
                  <button
                    onClick={handlePrivateListing}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                  >
                    List Your Ad
                  </button>
                </div>

                <div className="p-8 bg-purple-50 rounded-xl border border-purple-200 text-center">
                  <Award className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Premium Service</h4>
                  <ul className="text-gray-600 space-y-3 mb-6 text-left">
                    <li>• Personal car advisor</li>
                    <li>• Professional marketing</li>
                    <li>• Maximum value guarantee</li>
                    <li>• White-glove experience</li>
                  </ul>
                  <button
                    onClick={handleSellYourCars}
                    className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
                  >
                    Get Premium Service
                  </button>
                </div>
              </div>
              
              {/* Location-specific CTA */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
                <div className="text-center">
                  <h4 className="font-bold text-purple-800 mb-4 text-xl">
                    Premium Service Available in {userLocation}
                  </h4>
                  <p className="text-purple-700 mb-6">
                    Join 500+ satisfied customers in {userLocation} who chose our premium service and got 18% more than market value.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">₹45K+</div>
                      <p className="text-sm text-purple-700">Average extra value</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">9.2</div>
                      <p className="text-sm text-purple-700">Average days to sell</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">4.9★</div>
                      <p className="text-sm text-purple-700">Customer satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Ready to get started?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-orange-50 rounded-xl border border-orange-200 text-center">
                <Building2 className="w-16 h-16 text-orange-600 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-gray-900 mb-4">Sell to Dealer</h4>
                <ul className="text-gray-600 space-y-3 mb-6 text-left">
                  <li>• Instant cash payment</li>
                  <li>• Zero paperwork hassle</li>
                  <li>• Guaranteed purchase</li>
                  <li>• 200+ verified dealers</li>
                </ul>
                <button
                  onClick={handleDealerSale}
                  className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg"
                >
                  Connect with Dealers
                </button>
              </div>
              
              <div className="p-8 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h4 className="text-xl font-bold text-gray-900 mb-4">List Privately</h4>
                <ul className="text-gray-600 space-y-3 mb-6 text-left">
                  <li>• Get maximum market price</li>
                  <li>• Reach 50L+ monthly visitors</li>
                  <li>• Free listing with premium options</li>
                  <li>• Direct buyer communication</li>
                </ul>
                <button
                  onClick={handlePrivateListing}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  List Your Ad
                </button>
              </div>
            </div>
            
            {/* Location-specific insights */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border border-blue-200">
              <div className="text-center">
                <h4 className="font-bold text-blue-800 mb-4 text-xl">
                  Market Advantage in {userLocation}
                </h4>
                <p className="text-blue-700 mb-6">
                  Cars in {userLocation} sell 25% faster than the national average with our platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">2.5L+</div>
                    <p className="text-sm text-blue-700">Active buyers</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">18</div>
                    <p className="text-sm text-blue-700">Avg. days to sell</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">₹25K+</div>
                    <p className="text-sm text-blue-700">Location premium</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                    <p className="text-sm text-blue-700">Success rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!selectedOption) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Location */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600 mr-2" />
              <select
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="text-lg font-medium text-blue-600 bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {majorCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sell Your Car
            </h1>
            <p className="text-xl text-gray-600">
              Choose the best way to sell your car in {userLocation}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Sell - Dealer Option */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                FASTEST
              </div>
              <div 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-orange-200 hover:border-orange-300"
                onClick={() => setSelectedOption('dealer')}
              >
                <div className="text-center">
                  <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Quick Sell</h3>
                  <p className="text-gray-600 mb-6">
                    Get instant offers from verified dealers
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center text-sm">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full mr-2">1</span>
                      Enter car details
                    </div>
                    <div className="flex items-center justify-center text-sm">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full mr-2">2</span>
                      Get instant offers
                    </div>
                    <div className="flex items-center justify-center text-sm">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full mr-2">3</span>
                      Complete the sale
                    </div>
                  </div>
                  
                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                    Start Quick Sell
                  </button>
                </div>
              </div>
            </div>

            {/* List Your Car - Private Sale Option */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200"
              onClick={() => setSelectedOption('private')}
            >
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">List Your Car</h3>
                <p className="text-gray-600 mb-6">
                  Create a detailed listing for maximum exposure
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Professional Photography
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Verification Support
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Nationwide Reach
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Negotiation Support
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Create Detailed Listing
                </button>
              </div>
            </div>

            {/* NEW: SellYourCars - Premium Option */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                PREMIUM
              </div>
              <div 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-purple-200 hover:border-purple-300"
                onClick={() => setSelectedOption('sellyourcars')}
              >
                <div className="text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">SellYourCars</h3>
                  <p className="text-gray-600 mb-6">
                    List your car and reach millions of potential buyers
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      Personal Car Advisor
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      Professional Marketing
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      Maximum Value Guarantee
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      Verified Buyer Network
                    </div>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                    Get Premium Service
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats with Location Context */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-900">
              Why Choose Car3.one in {userLocation}?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2.5L+</div>
                <p className="text-sm text-gray-600">Active Buyers in {userLocation}</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-sm text-gray-600">Verified Dealers Nearby</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">₹25K+</div>
                <p className="text-sm text-gray-600">Location Premium Value</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">4.8★</div>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => setSelectedOption('')}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            ← Back to options
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600">{userLocation}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedOption === 'dealer' ? 'Quick Sell to Dealer' : 
               selectedOption === 'sellyourcars' ? 'SellYourCars Premium Service' : 
               'List Your Car Privately'}
            </h1>
            <p className="text-xl text-gray-600">
              {selectedOption === 'dealer' 
                ? 'Get instant cash with zero hassle' 
                : selectedOption === 'sellyourcars'
                ? 'Premium white-glove service for maximum value'
                : 'Maximize your car\'s value with direct sales'
              }
            </p>
          </div>
        </div>

        {selectedOption === 'dealer' ? (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect with Verified Dealers in {userLocation}</h2>
              <p className="text-gray-600">Get multiple quotes and choose the best offer</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {dealerBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-orange-600 mb-3 flex justify-center">{benefit.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleDealerSale}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors"
              >
                Get Dealer Quotes Now
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Free service • No obligation • Multiple quotes in 24 hours
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap justify-center space-x-2 md:space-x-8 px-4 md:px-8 pt-6">
                {[
                  { key: 'why', label: selectedOption === 'sellyourcars' ? 'Why choose premium?' : 'Why sell privately?' },
                  { key: 'price', label: 'How much can I sell for?' },
                  { key: 'time', label: 'How long does it take?' },
                  { key: 'process', label: 'What is the process?' },
                  { key: 'start', label: 'Ready to get started?' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`pb-4 px-2 md:px-4 border-b-2 font-medium text-sm md:text-base whitespace-nowrap transition-colors ${
                      activeTab === tab.key
                        ? `border-${selectedOption === 'sellyourcars' ? 'purple' : 'blue'}-500 text-${selectedOption === 'sellyourcars' ? 'purple' : 'blue'}-600`
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-12">
              {renderTabContent()}
            </div>

            {/* CTA Footer */}
            <div className="bg-gray-50 px-6 md:px-12 py-8 rounded-b-xl">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedOption === 'sellyourcars' 
                    ? `Get your premium service started in ${userLocation}`
                    : `List your car in ${userLocation} in just minutes`
                  }
                </p>
                <button
                  onClick={selectedOption === 'sellyourcars' ? handleSellYourCars : handlePrivateListing}
                  className={`${selectedOption === 'sellyourcars' 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                  } text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors`}
                >
                  {selectedOption === 'sellyourcars' ? 'Get Premium Service' : 'List Your Ad'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellCarOptions;
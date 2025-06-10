'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Shield, TrendingUp, MapPin, Calendar, Fuel, Settings, Users, ChevronRight, Building2, IndianRupee } from 'lucide-react';

const ValuationResults = () => {
  const router = useRouter();
  const [valuationData, setValuationData] = useState<any>(null);
  const [showCertification, setShowCertification] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('valuationData');
    if (data) {
      setValuationData(JSON.parse(data));
    } else {
      router.push('/whats-your-car-worth');
    }
  }, [router]);

  const handleCertification = () => {
    setShowCertification(true);
  };

  const handleSellToDealers = () => {
    // Store valuation data for selling flow
    const sellData = {
      minValue: minValue,
      maxValue: maxValue,
      vehicleDetails: valuationData?.formData || {}
    };
    localStorage.setItem('sellCarData', JSON.stringify(sellData));
    router.push('/sell/options?source=valuation&type=dealer');
  };

  const handleListPrivately = () => {
    // Store valuation data for selling flow
    const sellData = {
      minValue: minValue,
      maxValue: maxValue,
      vehicleDetails: valuationData?.formData || {}
    };
    localStorage.setItem('sellCarData', JSON.stringify(sellData));
    router.push('/sell/options?source=valuation&type=private');
  };

  if (!valuationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading valuation results...</p>
        </div>
      </div>
    );
  }

  // Mock valuation calculation based on Indian market
  const baseValue = 450000;
  const minValue = Math.round(baseValue * 0.85);
  const maxValue = Math.round(baseValue * 1.15);
  const dealerPrice = Math.round(minValue * 0.85);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Market Value Estimate</h2>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    ₹{minValue.toLocaleString()} - ₹{maxValue.toLocaleString()}
                  </div>
                  <p className="text-blue-700 font-medium">Private Sale Range</p>
                </div>
                
                {/* Dealer vs Private Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-center mb-2">
                      <Building2 className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="font-semibold text-orange-800">Dealer Price</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">₹{dealerPrice.toLocaleString()}</div>
                    <p className="text-sm text-orange-700">Instant cash, quick sale</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-800">Private Sale</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">₹{maxValue.toLocaleString()}</div>
                    <p className="text-sm text-green-700">Maximum market value</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-semibold">{valuationData.formData?.registrationYear || '2020'}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Fuel className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Fuel</p>
                  <p className="font-semibold">Petrol</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Settings className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Transmission</p>
                  <p className="font-semibold">Manual</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Owner</p>
                  <p className="font-semibold">{valuationData.formData?.firstOwner === 'Yes' ? '1st' : '2nd+'}</p>
                </div>
              </div>

              {/* Market Analysis */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Market Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">Good</p>
                    <p className="text-sm text-gray-600">Market Condition</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">30</p>
                    <p className="text-sm text-gray-600">Days to Sell</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">High</p>
                    <p className="text-sm text-gray-600">Demand</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Dealer First */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleSellToDealers}
                className="bg-orange-600 text-white p-6 rounded-xl hover:bg-orange-700 transition-colors relative"
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  RECOMMENDED
                </div>
                <Building2 className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Sell to Dealers</h3>
                <p className="text-orange-100 text-sm mb-2">Get instant cash in 24-48 hours</p>
                <p className="text-lg font-bold">₹{dealerPrice.toLocaleString()}</p>
              </button>
              
              <button
                onClick={handleListPrivately}
                className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-8 h-8" />
                  <ChevronRight className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">List Privately</h3>
                <p className="text-blue-100 text-sm mb-2">Get maximum market price</p>
                <p className="text-lg font-bold">₹{maxValue.toLocaleString()}</p>
              </button>

              <button
                onClick={handleCertification}
                className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors"
              >
                <Shield className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Get Certified</h3>
                <p className="text-green-100 text-sm mb-2">Professional inspection report</p>
                <p className="text-lg font-bold">₹2,999</p>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vehicle Age</span>
                  <span className="text-sm font-medium text-red-600">-8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Low Mileage</span>
                  <span className="text-sm font-medium text-green-600">+5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Single Owner</span>
                  <span className="text-sm font-medium text-green-600">+3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Market Trend</span>
                  <span className="text-sm font-medium text-green-600">+2%</span>
                </div>
              </div>
            </div>

            {/* Location Impact */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location Impact
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {valuationData.formData?.location || 'Delhi NCR'}
              </p>
              <p className="text-sm text-green-600 font-medium">
                +₹25,000 above national average
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Metro cities typically have higher resale values
              </p>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Selling Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Service records increase value by 5-10%</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Professional photos sell cars 40% faster</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Clean interiors can add ₹10,000+ value</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Modal */}
        {showCertification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Vehicle Certification</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm">Professional 200-point inspection</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm">Increase buyer confidence by 80%</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm">Higher selling price potential (+₹15,000)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm">Legal documentation support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm">Home inspection available</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Special Offer:</strong> Get certification for ₹2,999 (Regular price: ₹4,999)
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCertification(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Book Inspection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValuationResults;
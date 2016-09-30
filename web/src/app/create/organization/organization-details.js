module.exports = {
    template: require('./organization-details.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        var self = this;

        self.readonly = false;
        self.selectedItem = null;
        self.searchText = null;
        self.querySearch = querySearch;
        self.industries = loadIndustries();
        self.selectedIndustries = [];
        self.autocompleteDemoRequireMatch = true;
        self.transformChip = transformChip;

        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            if (angular.isObject(chip)) {
                return chip;
            }
            return {name: chip, type: 'new'};
        }

        /**
         * Search for industries.
         */
        function querySearch(query) {
            var results = query ? self.industries.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(industry) {
                return (industry._lowername.indexOf(lowercaseQuery) === 0) ||
                    (industry._lowervalue.indexOf(lowercaseQuery) === 0);
            };
        }

        function loadIndustries() {
            var industries = [
                {value: 'ACCOUNTING', name: 'Accounting'},
                {value: 'AIRLINES_AVIATION', name: 'Airlines/Aviation'},
                {value: 'ALTERNATIVE_DISPUTE_RESOLUTION', name: 'Alternative Dispute Resolution'},
                {value: 'ALTERNATIVE_MEDICINE', name: 'Alternative Medicine'},
                {value: 'ANIMATION', name: 'Animation'},
                {value: 'APPAREL_FASHION', name: 'Apparel & Fashion'},
                {value: 'ARCHITECTURE_PLANNING', name: 'Architecture & Planning'},
                {value: 'ARTS_CRAFTS', name: 'Arts and Crafts'},
                {value: 'AUTOMOTIVE', name: 'Automotive'},
                {value: 'AVIATION_AEROSPACE', name: 'Aviation & Aerospace'},
                {value: 'BANKING', name: 'Banking'},
                {value: 'BIOTECHNOLOGY', name: 'Biotechnology'},
                {value: 'BROADCAST_MEDIA', name: 'Broadcast Media'},
                {value: 'BUILDING_MATERIALS', name: 'Building Materials'},
                {value: 'BUSINESS_SUPPLIES_EQUIPMENT', name: 'Business Supplies and Equipment'},
                {value: 'CAPITAL_MARKETS', name: 'Capital Markets'},
                {value: 'CHEMICALS', name: 'Chemicals'},
                {value: 'CIVIC_SOCIAL_ORGANIZATION', name: 'Civic & Social Organization'},
                {value: 'CIVIL_ENGINEERING', name: 'Civil Engineering'},
                {value: 'COMMERCIAL_REAL_ESTATE', name: 'Commercial Real Estate'},
                {value: 'COMPUTER_NETWORK_SECURITY', name: 'Computer & Network Security'},
                {value: 'COMPUTER_GAMES', name: 'Computer Games'},
                {value: 'COMPUTER_HARDWARE', name: 'Computer Hardware'},
                {value: 'COMPUTER_NETWORKING', name: 'Computer Networking'},
                {value: 'COMPUTER_SOFTWARE', name: 'Computer Software'},
                {value: 'CONSTRUCTION', name: 'Construction'},
                {value: 'CONSUMER_ELECTRONICS', name: 'Consumer Electronics'},
                {value: 'CONSUMER_GOODS', name: 'Consumer Goods'},
                {value: 'CONSUMER_SERVICES', name: 'Consumer Services'},
                {value: 'COSMETICS', name: 'Cosmetics'},
                {value: 'DAIRY', name: 'Dairy'},
                {value: 'DEFENSE_SPACE', name: 'Defence & Space'},
                {value: 'DESIGN', name: 'Design'},
                {value: 'EDUCATION_MANAGEMENT', name: 'Education Management'},
                {value: 'E_LEARNING', name: 'E-Learning'},
                {value: 'ELECTRICAL_ELECTRONIC_MANUFACTURING', name: 'Electrical/Electronic Manufacturing'},
                {value: 'ENTERTAINMENT', name: 'Entertainment'},
                {value: 'ENVIRONMENTAL_SERVICES', name: 'Environmental Services'},
                {value: 'EVENTS_SERVICES', name: 'Events Services'},
                {value: 'EXECUTIVE_OFFICE', name: 'Executive Office'},
                {value: 'FACILITIES_SERVICES', name: 'Facilities Services'},
                {value: 'FARMING', name: 'Farming'},
                {value: 'FINANCIAL_SERVICES', name: 'Financial Services'},
                {value: 'FINE_ART', name: 'Fine Art'},
                {value: 'FISHERY', name: 'Fishery'},
                {value: 'FOOD_BEVERAGES', name: 'Food & Beverages'},
                {value: 'FOOD_PRODUCTION', name: 'Food Production'},
                {value: 'FUND_RAISING', name: 'Fund-Raising'},
                {value: 'FURNITURE', name: 'Furniture'},
                {value: 'GAMBLING_CASINOS', name: 'Gambling & Casinos'},
                {value: 'GLASS_CERAMICS_CONCRETE', name: 'Glass, Ceramics & Concrete'},
                {value: 'GOVERNMENT_ADMINISTRATION', name: 'Government Administration'},
                {value: 'GOVERNMENT_RELATIONS', name: 'Government Relations'},
                {value: 'GRAPHIC_DESIGN', name: 'Graphic Design'},
                {value: 'HEALTH_WELLNESS_FITNESS', name: 'Health, Wellness and Fitness'},
                {value: 'HIGHER_EDUCATION', name: 'Higher Education'},
                {value: 'HOSPITAL_HEALTH_CARE', name: 'Hospital & Health Care'},
                {value: 'HOSPITALITY', name: 'Hospitality'},
                {value: 'HUMAN_RESOURCES', name: 'Human Resources'},
                {value: 'IMPORT_EXPORT', name: 'Import and Export'},
                {value: 'INDIVIDUAL_FAMILY_SERVICES', name: 'Individual & Family Services'},
                {value: 'INDUSTRIAL_AUTOMATION', name: 'Industrial Automation'},
                {value: 'INFORMATION_SERVICES', name: 'Information Services'},
                {value: 'INFORMATION_TECHNOLOGY_SERVICES', name: 'Information Technology and Services'},
                {value: 'INSURANCE', name: 'Insurance'},
                {value: 'INTERNATIONAL_AFFAIRS', name: 'International Affairs'},
                {value: 'INTERNATIONAL_TRADE_DEVELOPMENT', name: 'International Trade and Development'},
                {value: 'INTERNET', name: 'Internet'},
                {value: 'INVESTMENT_BANKING', name: 'Investment Banking'},
                {value: 'INVESTMENT_MANAGEMENT', name: 'Investment Management'},
                {value: 'JUDICIARY', name: 'Judiciary'},
                {value: 'LAW_ENFORCEMENT', name: 'Law Enforcement'},
                {value: 'LAW_PRACTICE', name: 'Law Practice'},
                {value: 'LEGAL_SERVICES', name: 'Legal Services'},
                {value: 'LEGISLATIVE_OFFICE', name: 'Legislative Office'},
                {value: 'LEISURE_TRAVEL_TOURISM', name: 'Leisure, Travel & Tourism'},
                {value: 'LIBRARIES', name: 'Libraries'},
                {value: 'LOGISTICS_SUPPLY_CHAIN', name: 'Logistics and Supply Chain'},
                {value: 'LUXURY_GOODS_JEWELRY', name: 'Luxury Goods & Jewellery'},
                {value: 'MACHINERY', name: 'Machinery'},
                {value: 'MANAGEMENT_CONSULTING', name: 'Management Consulting'},
                {value: 'MARITIME', name: 'Maritime'},
                {value: 'MARKET_RESEARCH', name: 'Market Research'},
                {value: 'MARKETING_ADVERTISING', name: 'Marketing and Advertising'},
                {value: 'MECHANICAL_OR_INDUSTRIAL_ENGINEERING', name: 'Mechanical or Industrial Engineering'},
                {value: 'MEDIA_PRODUCTION', name: 'Media Production'},
                {value: 'MEDICAL_DEVICES', name: 'Medical Devices'},
                {value: 'MEDICAL_PRACTICE', name: 'Medical Practice'},
                {value: 'MENTAL_HEALTH_CARE', name: 'Mental Health Care'},
                {value: 'MILITARY', name: 'Military'},
                {value: 'MINING_METALS', name: 'Mining & Metals'},
                {value: 'MOTION_PICTURES_FILM', name: 'Motion Pictures and Film'},
                {value: 'MUSEUMS_INSTITUTIONS', name: 'Museums and Organizations'},
                {value: 'MUSIC', name: 'Music'},
                {value: 'NANOTECHNOLOGY', name: 'Nanotechnology'},
                {value: 'NEWSPAPERS', name: 'Newspapers'},
                {value: 'NON_PROFIT_ORGANIZATION_MANAGEMENT', name: 'Non-Profit Organization Management'},
                {value: 'OIL_ENERGY', name: 'Oil & Energy'},
                {value: 'ONLINE_MEDIA', name: 'Online Media'},
                {value: 'OUTSOURCING_OFFSHORING', name: 'Outsourcing/Offshoring'},
                {value: 'PACKAGE_FREIGHT_DELIVERY', name: 'Package/Freight Delivery'},
                {value: 'PACKAGING_CONTAINERS', name: 'Packaging and Containers'},
                {value: 'PAPER_FOREST_PRODUCTS', name: 'Paper & Forest Products'},
                {value: 'PERFORMING_ARTS', name: 'Performing Arts'},
                {value: 'PHARMACEUTICALS', name: 'Pharmaceuticals'},
                {value: 'PHILANTHROPY', name: 'Philanthropy'},
                {value: 'PHOTOGRAPHY', name: 'Photography'},
                {value: 'PLASTICS', name: 'Plastics'},
                {value: 'POLITICAL_ORGANIZATION', name: 'Political Organization'},
                {value: 'PRIMARY_SECONDARY_EDUCATION', name: 'Primary/Secondary Education'},
                {value: 'PRINTING', name: 'Printing'},
                {value: 'PROFESSIONAL_TRAINING_COACHING', name: 'Professional Training & Coaching'},
                {value: 'PROGRAM_DEVELOPMENT', name: 'Program Development'},
                {value: 'PUBLIC_POLICY', name: 'Public Policy'},
                {value: 'PUBLIC_RELATIONS_COMMUNICATIONS', name: 'Public Relations and Communications'},
                {value: 'PUBLIC_SAFETY', name: 'Public Safety'},
                {value: 'PUBLISHING', name: 'Publishing'},
                {value: 'RAILROAD_MANUFACTURE', name: 'Railway Manufacture'},
                {value: 'RANCHING', name: 'Ranching'},
                {value: 'REAL_ESTATE', name: 'Real Estate'},
                {value: 'RECREATIONAL_FACILITIES_SERVICES', name: 'Recreational Facilities and Services'},
                {value: 'RELIGIOUS_INSTITUTIONS', name: 'Religious Organizations'},
                {value: 'RENEWABLES_ENVIRONMENT', name: 'Renewables & Environment'},
                {value: 'RESEARCH', name: 'Research'},
                {value: 'RESTAURANTS', name: 'Restaurants'},
                {value: 'RETAIL', name: 'Retail'},
                {value: 'SECURITY_INVESTIGATIONS', name: 'Security and Investigations'},
                {value: 'SEMICONDUCTORS', name: 'Semiconductors'},
                {value: 'SHIPBUILDING', name: 'Shipbuilding'},
                {value: 'SPORTING_GOODS', name: 'Sporting Goods'},
                {value: 'SPORTS', name: 'Sports'},
                {value: 'STAFFING_RECRUITING', name: 'Staffing and Recruiting'},
                {value: 'SUPERMARKETS', name: 'Supermarkets'},
                {value: 'TELECOMMUNICATIONS', name: 'Telecommunications'},
                {value: 'TEXTILES', name: 'Textiles'},
                {value: 'THINK_TANKS', name: 'Think Tanks'},
                {value: 'TOBACCO', name: 'Tobacco'},
                {value: 'TRANSLATION_LOCALIZATION', name: 'Translation and Localization'},
                {value: 'TRANSPORTATION_TRUCKING_RAILROAD', name: 'Transportation/Trucking/Railway'},
                {value: 'UTILITIES', name: 'Utilities'},
                {value: 'VENTURE_CAPITAL_PRIVATE_EQUITY', name: 'Venture Capital & Private Equity'},
                {value: 'VETERINARY', name: 'Veterinary'},
                {value: 'WAREHOUSING', name: 'Warehousing'},
                {value: 'WHOLESALE', name: 'Wholesale'},
                {value: 'WINE_SPIRITS', name: 'Wine and Spirits'},
                {value: 'WIRELESS', name: 'Wireless'},
                {value: 'WRITING_EDITING', name: 'Writing and Editing'}
            ];

            return industries.map(function (industry) {
                industry._lowername = industry.name.toLowerCase();
                industry._lowervalue = industry.value.toLowerCase();
                return industry;
            });
        }
    }
};

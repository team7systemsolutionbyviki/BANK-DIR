/**
 * ==========================================================================
 * BANK DIRECTORY SEARCH SYSTEM - MAIN SCRIPT
 * High-performance, zero-backend, offline Banking Directory application
 * Supports 100,000+ branch records with DataTables deferred rendering.
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- ENGLISH & TAMIL I18N DICTIONARY ---
  const TRANSLATIONS = {
    en: {
      system_version: 'v3.0 Online Suite',
      nav_dashboard: 'Dashboard',
      nav_search: 'Search Directory',
      nav_districts: 'Districts',
      nav_banks: 'Banks',
      nav_favorites: 'Saved Branches',
      nav_admin: 'Admin Panel',
      nav_settings: 'Settings',
      nav_about: 'About & Help',
      status_online: 'Online Mode',
      search_placeholder: 'Quick IFSC, Bank, Branch search...',
      dash_welcome: 'Banking Directory Dashboard',
      dash_subtext: 'Real-time stats and swift lookup across nationalized and private banks',
      dash_btn_search: 'Search Now',
      stat_total_banks: 'Total Banks',
      stat_total_branches: 'Total Branches',
      stat_districts: 'Total Districts',
      stat_searches: 'Search Count',
      dash_top_banks: 'Major Banks Network',
      dash_recent_searches: 'Recent Searches',
      dash_saved_branches: 'Saved Favorites',
      search_title: 'Bank Directory Search',
      search_subtitle: 'Filter by State, District, Bank Name, IFSC, MICR, or Branch Address',
      lbl_state: 'State',
      lbl_district: 'District',
      lbl_bank_name: 'Bank Name',
      lbl_branch_name: 'Branch Name',
      lbl_ifsc: 'IFSC Code',
      lbl_micr: 'MICR Code',
      lbl_address: 'Address Keywords',
      opt_all_states: '-- All States --',
      opt_all_districts: '-- All Districts --',
      opt_all_banks: '-- All Banks --',
      btn_reset: 'Reset Filters',
      btn_search: 'Search Directory',
      district_title: 'District Directory Browser',
      district_subtitle: 'Select a district to view all operating bank branches and summary stats',
      lbl_select_district: 'Select District',
      bank_title: 'Bank Network Directory',
      bank_subtitle: 'Explore branches organized by banking institutions',
      fav_title: 'Bookmarked Bank Branches',
      fav_subtitle: 'Quick access to your saved branches for easy copy and maps access',
      admin_title: 'Admin & Data Management',
      admin_subtitle: 'Import datasets, edit records, backup & restore directory database',
      settings_title: 'System Settings',
      settings_subtitle: 'Customize interface preferences, language, font scaling, and data storage',
      set_appearance: 'Appearance & Theme',
      set_dark_mode: 'Dark Mode',
      set_compact_view: 'Compact Table View',
      set_large_font: 'Large Accessibility Font',
      set_language: 'Language Preference',
      lbl_select_lang: 'Active Interface Language',
      mode_district: 'District Explorer',
      mode_route: 'Route-Wise Directory',
      lbl_origin: 'Origin / Starting Town',
      lbl_destination: 'Destination Town',
      btn_find_route_banks: 'Find Route Banks',
      lbl_preset_routes: 'Popular Highway Routes:'
    },
    ta: {
      system_version: 'v3.0 ஆன்லைன் பதிப்பு',
      nav_dashboard: 'முகப்பு பலகை',
      nav_search: 'வங்கி தேடல்',
      nav_districts: 'மாவட்டங்கள்',
      nav_banks: 'வங்கிகள்',
      nav_favorites: 'சேமிக்கப்பட்டவை',
      nav_admin: 'நிர்வாக பகுதி',
      nav_settings: 'அமைப்புகள்',
      nav_about: 'பற்றி & உதவி',
      status_online: 'ஆன்லைன் முறை',
      search_placeholder: 'IFSC, வங்கி, கிளை விரைவுத் தேடல்...',
      dash_welcome: 'வங்கி அடைவு தகவல் பலகை',
      dash_subtext: 'இந்திய வங்கிகளின் கிளைகள் மற்றும் IFSC குறியீடுகளின் விரைவு தகவல்',
      dash_btn_search: 'தேடத் தொடங்கு',
      stat_total_banks: 'மொத்த வங்கிகள்',
      stat_total_branches: 'மொத்த கிளைகள்',
      stat_districts: 'மொத்த மாவட்டங்கள்',
      stat_searches: 'தேடல்கள் எண்ணிக்கை',
      dash_top_banks: 'முக்கிய வங்கிகள்',
      dash_recent_searches: 'சமீபத்திய தேடல்கள்',
      dash_saved_branches: 'சேமித்த கிளைகள்',
      search_title: 'வங்கி கிளை தேடல்',
      search_subtitle: 'மாநிலம், மாவட்டம், வங்கி பெயர், IFSC, MICR மூலம் தேடவும்',
      lbl_state: 'மாநிலம்',
      lbl_district: 'மாவட்டம்',
      lbl_bank_name: 'வங்கி பெயர்',
      lbl_branch_name: 'கிளை பெயர்',
      lbl_ifsc: 'IFSC குறியீடு',
      lbl_micr: 'MICR குறியீடு',
      lbl_address: 'முகவரி குறிச்சொற்கள்',
      opt_all_states: '-- அனைத்து மாநிலங்கள் --',
      opt_all_districts: '-- அனைத்து மாவட்டங்கள் --',
      opt_all_banks: '-- அனைத்து வங்கிகள் --',
      btn_reset: 'மீட்டமைக்க',
      btn_search: 'தேடுக',
      district_title: 'மாவட்ட & வழித்தட வங்கி உலாவி',
      district_subtitle: 'மாவட்டம் அல்லது வழித்தட நெடுஞ்சாலைகள் (எ.கா. பொள்ளாச்சி - பழனி) மூலம் வங்கிகளைக் காணவும்',
      lbl_select_district: 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
      bank_title: 'வங்கி நிறுவனம் வாரியாக',
      bank_subtitle: 'வங்கிகள் வாரியாக கிளைகளைக் கண்டறியவும்',
      fav_title: 'சேமிக்கப்பட்ட கிளைகள்',
      fav_subtitle: 'நீங்கள் சேமித்த வங்கிக் கிளைகளின் விரைவுப் பட்டியல்',
      admin_title: 'நிர்வாகி பகுதி',
      admin_subtitle: 'புதிய கிளை சேர்த்தல், தரவு இறக்குமதி மற்றும் காப்புப்பிரதி',
      settings_title: 'அமைப்புகள்',
      settings_subtitle: 'பயனர் விருப்பங்கள், மொழி மற்றும் தோற்ற அமைப்புகள்',
      set_appearance: 'தோற்றம் & தீம்',
      set_dark_mode: 'இருண்ட பயன்முறை (Dark Mode)',
      set_compact_view: 'சுருக்கப்பட்ட அட்டவணை',
      set_large_font: 'பெரிய எழுத்துரு',
      set_language: 'மொழி தேர்வு',
      lbl_select_lang: 'பயன்பாட்டு மொழி',
      mode_district: 'மாவட்ட உலாவி',
      mode_route: 'வழித்தட வங்கி அடைவு',
      lbl_origin: 'தொடக்க நகரம் / இடம்',
      lbl_destination: 'செல்லும் நகரம்',
      btn_find_route_banks: 'வழித்தட வங்கிகளைக் காண்',
      lbl_preset_routes: 'பிரபலமான நெடுஞ்சாலை வழிகள்:'
    }
  };

  // --- EMBEDDED SEED DATASET (Fallback if fetch fails offline) ---
  const SEED_BANKS = [
    { bank: "State Bank of India", branch: "Pollachi Main", ifsc: "SBIN0000899", micr: "642002001", district: "Coimbatore", address: "1 Palakkad Road, Pollachi", state: "Tamil Nadu", pincode: "642001", phone: "04259-223456", email: "pollachi@sbi.co.in" },
    { bank: "State Bank of India", branch: "Coimbatore Main", ifsc: "SBIN0000825", micr: "641002002", district: "Coimbatore", address: "State Bank Road, Post Box No. 1, Coimbatore", state: "Tamil Nadu", pincode: "641018", phone: "0422-2300561", email: "coimbatore.main@sbi.co.in" },
    { bank: "State Bank of India", branch: "Chennai Main", ifsc: "SBIN0000800", micr: "600002001", district: "Chennai", address: "22 Rajaji Salai, George Town, Chennai", state: "Tamil Nadu", pincode: "600001", phone: "044-25341200", email: "chennaimain@sbi.co.in" },
    { bank: "State Bank of India", branch: "Madurai Main", ifsc: "SBIN0000874", micr: "625002002", district: "Madurai", address: "West Veli Street, Madurai", state: "Tamil Nadu", pincode: "625001", phone: "0452-2341234", email: "maduraimain@sbi.co.in" },
    { bank: "State Bank of India", branch: "Mumbai Main Branch", ifsc: "SBIN0000300", micr: "400002001", district: "Mumbai", address: "Horniman Circle, Fort, Mumbai", state: "Maharashtra", pincode: "400001", phone: "022-22661234", email: "mumbaimain@sbi.co.in" },
    { bank: "HDFC Bank", branch: "RS Puram Coimbatore", ifsc: "HDFC0000030", micr: "641240002", district: "Coimbatore", address: "No 165 166, DB Road, RS Puram, Coimbatore", state: "Tamil Nadu", pincode: "641002", phone: "0422-6160616", email: "rspuram.cbe@hdfcbank.com" },
    { bank: "HDFC Bank", branch: "Anna Nagar Chennai", ifsc: "HDFC0000017", micr: "600240003", district: "Chennai", address: "Second Avenue, Anna Nagar, Chennai", state: "Tamil Nadu", pincode: "600040", phone: "044-6160616", email: "annanagar@hdfcbank.com" },
    { bank: "HDFC Bank", branch: "Bandra West Mumbai", ifsc: "HDFC0000001", micr: "400240002", district: "Mumbai", address: "Linking Road, Bandra West, Mumbai", state: "Maharashtra", pincode: "400050", phone: "022-6160616", email: "bandra@hdfcbank.com" },
    { bank: "ICICI Bank", branch: "Trichy Road Coimbatore", ifsc: "ICIC0000016", micr: "641229002", district: "Coimbatore", address: "Cheran Plaza, Trichy Road, Coimbatore", state: "Tamil Nadu", pincode: "641018", phone: "0422-4351100", email: "trichyroad@icicibank.com" },
    { bank: "ICICI Bank", branch: "Cenotaph Road Chennai", ifsc: "ICIC0000001", micr: "600229001", district: "Chennai", address: "1 Cenotaph Road, Teynampet, Chennai", state: "Tamil Nadu", pincode: "600018", phone: "044-4351100", email: "cenotaph@icicibank.com" },
    { bank: "Axis Bank", branch: "Gandhipuram Coimbatore", ifsc: "UTIB0000040", micr: "641211002", district: "Coimbatore", address: "764 Cross Cut Road, Gandhipuram, Coimbatore", state: "Tamil Nadu", pincode: "641012", phone: "0422-2490050", email: "gandhipuram@axisbank.com" },
    { bank: "Axis Bank", branch: "Mylapore Chennai", ifsc: "UTIB0000005", micr: "600211002", district: "Chennai", address: "Royapettah High Road, Mylapore, Chennai", state: "Tamil Nadu", pincode: "600004", phone: "044-2490050", email: "mylapore@axisbank.com" },
    { bank: "Punjab National Bank", branch: "Anna Salai Chennai", ifsc: "PUNB0000100", micr: "600024002", district: "Chennai", address: "769 Anna Salai, Thousand Lights, Chennai", state: "Tamil Nadu", pincode: "600002", phone: "044-28520341", email: "annasalai@pnb.co.in" },
    { bank: "Punjab National Bank", branch: "Oppanakara Coimbatore", ifsc: "PUNB0000200", micr: "641024002", district: "Coimbatore", address: "Oppanakara Street, Town Hall, Coimbatore", state: "Tamil Nadu", pincode: "641001", phone: "0422-2391234", email: "oppanakara@pnb.co.in" },
    { bank: "Canara Bank", branch: "T Nagar Chennai", ifsc: "CNRB0000910", micr: "600015010", district: "Chennai", address: "Usman Road, T Nagar, Chennai", state: "Tamil Nadu", pincode: "600017", phone: "044-24345511", email: "tnagar.chennai@canarabank.com" },
    { bank: "Canara Bank", branch: "Town Hall Coimbatore", ifsc: "CNRB0000850", micr: "641015002", district: "Coimbatore", address: "Oppanakara Street, Coimbatore", state: "Tamil Nadu", pincode: "641001", phone: "0422-2301234", email: "townhall.cbe@canarabank.com" },
    { bank: "Bank of Baroda", branch: "Madurai Main", ifsc: "BARB0MADURA", micr: "625012002", district: "Madurai", address: "West Tower Street, Madurai", state: "Tamil Nadu", pincode: "625001", phone: "0452-2345678", email: "madurai@bankofbaroda.com" },
    { bank: "Bank of Baroda", branch: "Coimbatore Main", ifsc: "BARB0COIMBA", micr: "641012001", district: "Coimbatore", address: "Bank Road, Coimbatore", state: "Tamil Nadu", pincode: "641018", phone: "0422-2300123", email: "coimbatore@bankofbaroda.com" },
    { bank: "Union Bank of India", branch: "Salem Main", ifsc: "UBIN0533351", micr: "636026002", district: "Salem", address: "First Agraharam, Salem", state: "Tamil Nadu", pincode: "636001", phone: "0427-2260123", email: "salem@unionbankofindia.com" },
    { bank: "Union Bank of India", branch: "Coimbatore Main", ifsc: "UBIN0533301", micr: "641026001", district: "Coimbatore", address: "Oppanakara Street, Coimbatore", state: "Tamil Nadu", pincode: "641001", phone: "0422-2301122", email: "cbe@unionbankofindia.com" },
    { bank: "Bank of India", branch: "Chennai Main", ifsc: "BKID0008000", micr: "600013001", district: "Chennai", address: "Erabalu Chetty Street, Parry Corner, Chennai", state: "Tamil Nadu", pincode: "600001", phone: "044-25340123", email: "chennai.main@bankofindia.co.in" },
    { bank: "Central Bank of India", branch: "Coimbatore Main", ifsc: "CBIN0280001", micr: "641016001", district: "Coimbatore", address: "Raja Street, Coimbatore", state: "Tamil Nadu", pincode: "641001", phone: "0422-2390123", email: "coimbatore@centralbank.co.in" },
    { bank: "Indian Bank", branch: "Harbour Chennai", ifsc: "IDIB000H001", micr: "600019002", district: "Chennai", address: "Rajaji Salai, Chennai", state: "Tamil Nadu", pincode: "600001", phone: "044-25220123", email: "harbour@indianbank.co.in" },
    { bank: "Indian Bank", branch: "Coimbatore Main", ifsc: "IDIB000C002", micr: "641019001", district: "Coimbatore", address: "DB Road, RS Puram, Coimbatore", state: "Tamil Nadu", pincode: "641002", phone: "0422-2540123", email: "coimbatore@indianbank.co.in" },
    { bank: "Indian Overseas Bank", branch: "Cathedral Chennai", ifsc: "IOBA0000001", micr: "600020002", district: "Chennai", address: "762 Anna Salai, Cathedral Road, Chennai", state: "Tamil Nadu", pincode: "600002", phone: "044-28521100", email: "cathedral@iob.in" },
    { bank: "Indian Overseas Bank", branch: "Pollachi Main", ifsc: "IOBA0000085", micr: "642020001", district: "Coimbatore", address: "Palakkad Road, Pollachi", state: "Tamil Nadu", pincode: "642001", phone: "04259-224466", email: "pollachi@iob.in" },
    { bank: "UCO Bank", branch: "Chennai Main", ifsc: "UCBA0000005", micr: "600028001", district: "Chennai", address: "Thambu Chetty Street, Chennai", state: "Tamil Nadu", pincode: "600001", phone: "044-25340055", email: "chennai@ucobank.co.in" },
    { bank: "Bank of Maharashtra", branch: "Chennai Main", ifsc: "MAHB0000003", micr: "600014001", district: "Chennai", address: "Mount Road, Chennai", state: "Tamil Nadu", pincode: "600002", phone: "044-28522334", email: "chennai@mahabank.co.in" },
    { bank: "Kotak Mahindra Bank", branch: "RS Puram Coimbatore", ifsc: "KKBK0000491", micr: "641485002", district: "Coimbatore", address: "DB Road, RS Puram, Coimbatore", state: "Tamil Nadu", pincode: "641002", phone: "0422-4567890", email: "rspuram@kotak.com" },
    { bank: "Kotak Mahindra Bank", branch: "MG Road Bengaluru", ifsc: "KKBK0000461", micr: "560485002", district: "Bengaluru Urban", address: "MG Road, Bengaluru", state: "Karnataka", pincode: "560001", phone: "080-45678900", email: "mgroad@kotak.com" },
    { bank: "IndusInd Bank", branch: "Race Course Coimbatore", ifsc: "INDB0000033", micr: "641234002", district: "Coimbatore", address: "Race Course Road, Coimbatore", state: "Tamil Nadu", pincode: "641018", phone: "0422-4441122", email: "racecourse@indusind.com" },
    { bank: "Federal Bank", branch: "Oppanakara Coimbatore", ifsc: "FDRL0001234", micr: "641049002", district: "Coimbatore", address: "Oppanakara Street, Coimbatore", state: "Tamil Nadu", pincode: "641001", phone: "0422-2304567", email: "cbe@federalbank.co.in" },
    { bank: "IDFC FIRST Bank", branch: "Avinashi Road Coimbatore", ifsc: "IDFB0040001", micr: "641740001", district: "Coimbatore", address: "Avinashi Road, Coimbatore", state: "Tamil Nadu", pincode: "641018", phone: "0422-6789012", email: "cbe@idfcfirstbank.com" },
    { bank: "Yes Bank", branch: "Avinashi Road Coimbatore", ifsc: "YESB0000045", micr: "641539002", district: "Coimbatore", address: "Tristar Towers, Avinashi Road, Coimbatore", state: "Tamil Nadu", pincode: "641018", phone: "0422-4300937", email: "cbe@yesbank.in" },
    { bank: "South Indian Bank", branch: "Pollachi", ifsc: "SIBL0000125", micr: "642059002", district: "Coimbatore", address: "New Scheme Road, Pollachi", state: "Tamil Nadu", pincode: "642001", phone: "04259-223344", email: "pollachi@sib.co.in" },
    { bank: "Karur Vysya Bank", branch: "Karur Main", ifsc: "KVBL0001101", micr: "639053002", district: "Karur", address: "Jawahar Bazaar, Karur", state: "Tamil Nadu", pincode: "639001", phone: "04324-260123", email: "karurmain@kvbmail.com" },
    { bank: "Karur Vysya Bank", branch: "Pollachi", ifsc: "KVBL0001150", micr: "642053001", district: "Coimbatore", address: "SS Kovil Street, Pollachi", state: "Tamil Nadu", pincode: "642001", phone: "04259-225577", email: "pollachi@kvbmail.com" },
    { bank: "City Union Bank", branch: "Kumbakonam Main", ifsc: "CIUB0000001", micr: "612054002", district: "Thanjavur", address: "TSR Big Street, Kumbakonam", state: "Tamil Nadu", pincode: "612001", phone: "0435-2432324", email: "cub@cityunionbank.com" },
    { bank: "Tamilnad Mercantile Bank", branch: "Tuticorin Main", ifsc: "TMBL0000001", micr: "628060002", district: "Thoothukudi", address: "Beach Road, Tuticorin", state: "Tamil Nadu", pincode: "628001", phone: "0461-2321234", email: "tuticorin@tmbank.in" },
    { bank: "Bandhan Bank", branch: "Kolkata Main", ifsc: "BDBL0001000", micr: "700750002", district: "Kolkata", address: "DN 32, Sector V, Salt Lake, Kolkata", state: "West Bengal", pincode: "700091", phone: "033-66090909", email: "kolkata@bandhanbank.com" },
    { bank: "AU Small Finance Bank", branch: "Jaipur Main", ifsc: "AUBL0002001", micr: "302765002", district: "Jaipur", address: "Bank House, Tonk Road, Jaipur", state: "Rajasthan", pincode: "302015", phone: "0141-6660000", email: "jaipur@aubank.in" },
    { bank: "Equitas Small Finance Bank", branch: "Chennai Main", ifsc: "ESFB0001001", micr: "600756002", district: "Chennai", address: "Phase II, Spencer Plaza, Anna Salai, Chennai", state: "Tamil Nadu", pincode: "600002", phone: "044-30898000", email: "chennai@equitasbank.com" },
    { bank: "Ujjivan Small Finance Bank", branch: "Bengaluru Main", ifsc: "UJVN0001001", micr: "560760002", district: "Bengaluru Urban", address: "Grape Garden, Koramangala, Bengaluru", state: "Karnataka", pincode: "560095", phone: "080-40712121", email: "bengaluru@ujjivan.com" },
    { bank: "Paytm Payments Bank", branch: "Noida Main", ifsc: "PYTM0123456", micr: "110999001", district: "Gautam Buddha Nagar", address: "B-121, Sector 5, Noida", state: "Uttar Pradesh", pincode: "201301", phone: "0120-4456789", email: "care@paytmbank.com" },
    { bank: "India Post Payments Bank", branch: "New Delhi GPO", ifsc: "IPPB0000001", micr: "110001001", district: "Central Delhi", address: "GPO Building, Connaught Place, New Delhi", state: "Delhi", pincode: "110001", phone: "011-23360001", email: "contact@ippbonline.in" },
    { bank: "Reserve Bank of India", branch: "Mumbai Apex", ifsc: "RBIS0GOINBB", micr: "400001001", district: "Mumbai", address: "Shahid Bhagat Singh Road, Fort, Mumbai", state: "Maharashtra", pincode: "400001", phone: "022-22660500", email: "help@rbi.org.in" },
    { bank: "HSBC Bank", branch: "MG Road Mumbai", ifsc: "HSBC0400002", micr: "400034002", district: "Mumbai", address: "52/60 MG Road, Fort, Mumbai", state: "Maharashtra", pincode: "400001", phone: "022-22674921", email: "india@hsbc.co.in" },
    { bank: "Standard Chartered Bank", branch: "Rajaji Salai Chennai", ifsc: "SCBL0036001", micr: "600036002", district: "Chennai", address: "19 Rajaji Salai, Chennai", state: "Tamil Nadu", pincode: "600001", phone: "044-25341234", email: "chennai@sc.com" }
  ];

  // --- APPLICATION STATE ---
  const AppState = {
    allData: [],
    filteredData: [],
    favorites: new Set(JSON.parse(localStorage.getItem('bank_favorites') || '[]')),
    recentSearches: JSON.parse(localStorage.getItem('bank_recent_searches') || '[]'),
    searchCount: parseInt(localStorage.getItem('bank_search_count') || '0', 10),
    language: localStorage.getItem('bank_lang') || 'en',
    theme: localStorage.getItem('bank_theme') || 'light',
    compactView: localStorage.getItem('bank_compact') === 'true',
    largeFont: localStorage.getItem('bank_large_font') === 'true',
    isAdminLoggedIn: sessionStorage.getItem('bank_super_admin_session') === 'true',
    currentUser: JSON.parse(localStorage.getItem('bank_current_user') || '{"name":"Active User","email":"user@bankdirectory.in","role":"Banking Directory User"}'),
    dataTable: null
  };

  // Global App Namespace
  window.App = {
    AppState: AppState,
    switchView: switchView,
    filterByBank: filterByBank,
    showBankBranches: showBankBranches,
    copyToClipboard: copyToClipboard,
    openQrModal: openQrModal,
    toggleFavorite: toggleFavorite,
    closeBankDetail: closeBankDetail,
    clearAllLocalStorage: clearAllLocalStorage,
    generateBenchmarkData: generateBenchmarkData,
    resetToSeedData: resetToSeedData,
    ExportManager: {},
    AdminManager: {},
    AuthManager: {},
    RouteWiseManager: {}
  };

  // --- FIREBASE REALTIME DATABASE CONFIGURATION ---
  const firebaseConfig = {
    apiKey: "AIzaSyAyICydfan3gpSfn8u29vNn69W9P6Hagrw",
    authDomain: "bankdirectroy.firebaseapp.com",
    databaseURL: "https://bankdirectroy-default-rtdb.firebaseio.com",
    projectId: "bankdirectroy",
    storageBucket: "bankdirectroy.firebasestorage.app",
    messagingSenderId: "626819385488",
    appId: "1:626819385488:web:bc5eba0a081526a3967015"
  };

  let firebaseDb = null;

  function initFirebase() {
    if (typeof firebase !== 'undefined') {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        firebaseDb = firebase.database();
        console.log("Firebase initialized successfully");
        listenToFirebaseChanges();
        listenToFirebaseReports();
        listenToFirebaseConnection();
      } catch (err) {
        console.warn("Firebase initialization warning:", err);
      }
    }
  }

  function listenToFirebaseConnection() {
    if (!firebaseDb) return;
    const connectedRef = firebaseDb.ref('.info/connected');
    connectedRef.on('value', snap => {
      const isConnected = snap.val() === true;
      const footerEl = document.getElementById('networkStatusFooter');
      const badgeEl = document.getElementById('topbarCloudStatusBadge');

      if (isConnected) {
        if (footerEl) {
          footerEl.innerHTML = `<i class="fa-solid fa-wifi text-success me-1"></i> <span data-i18n="status_online">Online Mode (Firebase Cloud DB Active)</span>`;
        }
        if (badgeEl) {
          badgeEl.className = 'badge bg-success-subtle text-success border border-success-subtle rounded-pill d-none d-md-flex align-items-center gap-1 px-3 py-1';
          badgeEl.innerHTML = `<span class="online-pulse"></span> Online Cloud DB`;
        }
      } else {
        if (footerEl) {
          footerEl.innerHTML = `<i class="fa-solid fa-wifi-slash text-warning me-1"></i> <span>Offline Mode (Local Cache Active)</span>`;
        }
        if (badgeEl) {
          badgeEl.className = 'badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill d-none d-md-flex align-items-center gap-1 px-3 py-1';
          badgeEl.innerHTML = `<i class="fa-solid fa-cloud-slash me-1 text-warning"></i> Offline Mode`;
        }
      }
    });
  }

  function listenToFirebaseChanges() {
    if (!firebaseDb) return;
    const ref = firebaseDb.ref('banks');
    ref.on('value', snapshot => {
      const cloudData = snapshot.val();
      const deletedIfscs = new Set(JSON.parse(localStorage.getItem('bank_deleted_ifscs') || '[]'));
      if (cloudData) {
        const cloudArray = Object.values(cloudData);
        if (cloudArray.length > 0) {
          const ifscMap = new Map();
          AppState.allData.forEach(item => {
            if (item.ifsc && !deletedIfscs.has(item.ifsc)) {
              ifscMap.set(item.ifsc, item);
            }
          });
          cloudArray.forEach(item => {
            if (item.ifsc && !deletedIfscs.has(item.ifsc)) {
              ifscMap.set(item.ifsc, normalizeBranch(item));
            } else if (item.ifsc && deletedIfscs.has(item.ifsc)) {
              deleteBranchFromFirebase(item.ifsc);
            }
          });

          const newArray = Array.from(ifscMap.values());
          if (newArray.length !== AppState.allData.length) {
            AppState.allData = newArray;
            AppState.filteredData = [...AppState.allData];
            if (AppState.dataTable) {
              AppState.dataTable.clear().rows.add(AppState.allData).draw(false);
            }
            populateSearchDropdowns();
            updateDashboardStats();
          }
        }
      } else {
        // Firebase Cloud DB is empty -> Auto-seed online cloud database with full dataset
        console.log("Seeding empty Firebase cloud database...");
        AppState.allData.forEach(b => syncBranchToFirebase(b));
      }
    });
  }

  function syncBranchToFirebase(branch) {
    if (!firebaseDb || !branch || !branch.ifsc) return;
    const safeKey = String(branch.ifsc).replace(/[\.#\$\[\]]/g, '_');
    firebaseDb.ref('banks/' + safeKey).set(branch)
      .then(() => console.log('Firebase synced branch:', branch.ifsc))
      .catch(err => console.error('Firebase save error:', err));
  }

  function deleteBranchFromFirebase(ifsc) {
    if (!firebaseDb || !ifsc) return;
    const safeKey = String(ifsc).replace(/[\.#\$\[\]]/g, '_');
    firebaseDb.ref('banks/' + safeKey).remove()
      .then(() => console.log('Firebase deleted branch:', ifsc))
      .catch(err => console.error('Firebase delete error:', err));
  }

  // --- FIREBASE USER REPORTS SYNC ---
  function listenToFirebaseReports() {
    if (!firebaseDb) return;
    const ref = firebaseDb.ref('user_reports');
    ref.on('value', snapshot => {
      const cloudReports = snapshot.val();
      if (cloudReports) {
        const reportsArray = Object.values(cloudReports).sort((a, b) => (b.id || 0) - (a.id || 0));
        localStorage.setItem('bank_user_reports', JSON.stringify(reportsArray));
        renderMySubmissions();
        const adminView = document.getElementById('view-admin');
        if (adminView && adminView.classList.contains('active')) {
          AdminManager.loadReports();
        }
      }
    });
  }

  function syncReportToFirebase(report) {
    if (!firebaseDb || !report || !report.id) return;
    firebaseDb.ref('user_reports/' + report.id).set(report)
      .then(() => console.log('Firebase synced report:', report.id))
      .catch(err => console.error('Firebase report save error:', err));
  }

  function deleteReportFromFirebase(id) {
    if (!firebaseDb || !id) return;
    firebaseDb.ref('user_reports/' + id).remove()
      .then(() => console.log('Firebase deleted report:', id))
      .catch(err => console.error('Firebase report delete error:', err));
  }

  // --- INITIALIZATION ENTRY POINT ---
  document.addEventListener('DOMContentLoaded', async function () {
    initThemeAndPrefs();
    initClock();
    initEventListeners();
    await loadInitialDataset();
    initDataTable();
    populateSearchDropdowns();
    updateDashboardStats();
    applyLanguage(AppState.language);
    AuthManager.updateAuthUI();
    initFirebase();

    // MANDATORY STRICT LOCK UNTIL LOGGED IN
    if (!AppState.currentUser) {
      document.body.classList.add('app-locked');
      AuthManager.openAuthModal('login');
    } else {
      document.body.classList.remove('app-locked');
    }
  });

  // --- THEME & PREFERENCES SETUP ---
  function initThemeAndPrefs() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    updateThemeIcon();

    if (AppState.compactView) {
      document.body.classList.add('compact-view');
      document.getElementById('setCompactView').checked = true;
    }
    if (AppState.largeFont) {
      document.body.classList.add('font-large');
      document.getElementById('setLargeFont').checked = true;
    }

    document.getElementById('setThemeDark').checked = (AppState.theme === 'dark');
    document.getElementById('setLanguageSelect').value = AppState.language;
    document.getElementById('langSelect').value = AppState.language;
  }

  function updateThemeIcon() {
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.className = AppState.theme === 'dark' ? 'fa-solid fa-sun text-warning' : 'fa-solid fa-moon';
    }
  }

  function toggleTheme() {
    AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    localStorage.setItem('bank_theme', AppState.theme);
    document.getElementById('setThemeDark').checked = (AppState.theme === 'dark');
    updateThemeIcon();
    showToast(`Switched to ${AppState.theme.toUpperCase()} theme`);
  }

  // --- LIVE CLOCK ---
  function initClock() {
    const clockEl = document.getElementById('liveClockDisplay');
    function updateClock() {
      if (clockEl) {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // --- DATA LOADING & LOCAL STORAGE SYNC ---
  // --- DATA NORMALIZER: Ensure every row has all required fields ---
  function normalizeBranch(row) {
    return {
      bank:     row.bank     || '',
      branch:   row.branch   || '',
      ifsc:     row.ifsc     || '',
      micr:     row.micr     || '',
      district: row.district || '',
      state:    row.state    || '',
      address:  row.address  || '',
      pincode:  row.pincode  || '',
      phone:    row.phone    || '',
      email:    row.email    || ''
    };
  }

  async function loadInitialDataset() {
    let data = [];
    try {
      const response = await fetch('banks.json');
      if (response.ok) {
        data = await response.json();
      } else {
        data = SEED_BANKS;
      }
    } catch (err) {
      console.warn('Fetch banks.json failed or running via file:// protocol. Falling back to seed dataset.', err);
      data = SEED_BANKS;
    }

    // Merge custom added branches from localStorage
    const localBranches = JSON.parse(localStorage.getItem('bank_custom_branches') || '[]');
    const deletedIfscs = new Set(JSON.parse(localStorage.getItem('bank_deleted_ifscs') || '[]'));
    const rawAll = [...data, ...localBranches].map(normalizeBranch);
    
    // De-duplicate by IFSC and exclude deleted branches
    const map = new Map();
    rawAll.forEach(b => {
      if (b.ifsc && !deletedIfscs.has(b.ifsc)) {
        map.set(b.ifsc, b);
      }
    });
    AppState.allData = Array.from(map.values());
    AppState.filteredData = [...AppState.allData];
  }

  // --- DATATABLE INITIALIZATION ---
  function initDataTable() {
    if ($.fn.DataTable.isDataTable('#bankTable')) {
      $('#bankTable').DataTable().clear().destroy();
    }

    AppState.dataTable = $('#bankTable').DataTable({
      data: AppState.allData,
      deferRender: true, // Critical for 100,000+ records support!
      pageLength: 25,
      lengthMenu: [[10, 25, 50, 100, 500], [10, 25, 50, 100, 500]],
      responsive: true,
      order: [[0, 'asc'], [1, 'asc']],
      columns: [
        {
          data: 'bank',
          defaultContent: '',
          render: function (data) {
            return `<strong class="text-primary">${sanitizeHtml(data || '')}</strong>`;
          }
        },
        {
          data: 'branch',
          defaultContent: '',
          render: function (data, type, row) {
            const isFav = AppState.favorites.has(row.ifsc);
            const favIcon = isFav ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-muted';
            return `<div class="d-flex align-items-center justify-content-between">
              <span>${sanitizeHtml(data || '')}</span>
              <button class="btn btn-sm btn-link p-0 ms-2" onclick="App.toggleFavorite('${escapeJs(row.ifsc || '')}')" title="Bookmark">
                <i class="${favIcon}"></i>
              </button>
            </div>`;
          }
        },
        {
          data: 'ifsc',
          defaultContent: '',
          render: function (data) {
            return data ? `<span class="badge-ifsc">${sanitizeHtml(data)}</span>` : '<span class="text-muted">-</span>';
          }
        },
        {
          data: 'micr',
          defaultContent: '',
          render: function (data) {
            return data ? `<small class="font-monospace text-muted">${sanitizeHtml(data)}</small>` : '<span class="text-muted">-</span>';
          }
        },
        {
          data: 'district',
          defaultContent: '',
          render: function (data) { return sanitizeHtml(data || ''); }
        },
        {
          data: 'state',
          defaultContent: '',
          render: function (data) { return sanitizeHtml(data || ''); }
        },
        {
          data: 'address',
          defaultContent: '',
          render: function (data) {
            return `<span style="font-size:0.85rem;" title="${sanitizeHtml(data)}">${truncateText(sanitizeHtml(data), 45)}</span>`;
          }
        },
        {
          data: null,
          render: function (data, type, row) {
            const phone = row.phone ? `<div><i class="fa-solid fa-phone me-1 text-success"></i>${sanitizeHtml(row.phone)}</div>` : '';
            const email = row.email ? `<div><i class="fa-regular fa-envelope me-1 text-primary"></i>${sanitizeHtml(row.email)}</div>` : '';
            return phone || email ? `<div style="font-size:0.78rem;">${phone}${email}</div>` : '<span class="text-muted">-</span>';
          }
        },
        {
          data: null,
          orderable: false,
          className: 'text-center',
          render: function (data, type, row) {
            const isSuperAdmin = AppState.isAdminLoggedIn || (AppState.currentUser && AppState.currentUser.role === 'Super Admin');
            return `<div class="d-flex justify-content-center gap-1">
              <button class="btn-table-action" onclick="App.copyToClipboard('${escapeJs(row.ifsc)}', 'IFSC Code copied!')" title="Copy IFSC">
                <i class="fa-regular fa-copy"></i> IFSC
              </button>
              <button class="btn-table-action" onclick="App.copyToClipboard('${escapeJs(row.address)}', 'Address copied!')" title="Copy Address">
                <i class="fa-solid fa-location-dot"></i> Address
              </button>
              <button class="btn-table-action" onclick="App.openQrModal('${escapeJs(row.ifsc)}')" title="QR Code & Details">
                <i class="fa-solid fa-qrcode"></i>
              </button>
              ${isSuperAdmin ? `
              <button class="btn-table-action text-danger border-danger" onclick="App.AdminManager.deleteBranch('${escapeJs(row.ifsc)}')" title="Super Admin: Delete Branch">
                <i class="fa-solid fa-trash-can text-danger"></i> Delete
              </button>` : ''}
            </div>`;
          }
        }
      ],
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search table records...",
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ branches",
        paginate: {
          first: '<i class="fa-solid fa-angles-left"></i>',
          previous: '<i class="fa-solid fa-angle-left"></i>',
          next: '<i class="fa-solid fa-angle-right"></i>',
          last: '<i class="fa-solid fa-angles-right"></i>'
        }
      }
    });

    updateTableResultCount();
  }

  function updateTableResultCount() {
    if (!AppState.dataTable) return;
    const count = AppState.dataTable.rows({ search: 'applied' }).count();
    const countEl = document.getElementById('tableResultCountText');
    if (countEl) {
      countEl.textContent = `Displaying ${count.toLocaleString()} bank branches`;
    }
  }

  // --- MULTI-FIELD SEARCH & AUTOCOMPLETE ---
  function populateSearchDropdowns() {
    const states = new Set();
    const districts = new Set();
    const banks = new Set();

    AppState.allData.forEach(item => {
      if (item.state) states.add(item.state);
      if (item.district) districts.add(item.district);
      if (item.bank) banks.add(item.bank);
    });

    populateSelect('filterState', Array.from(states).sort(), TRANSLATIONS[AppState.language].opt_all_states);
    populateSelect('filterDistrict', Array.from(districts).sort(), TRANSLATIONS[AppState.language].opt_all_districts);
    populateSelect('filterBank', Array.from(banks).sort(), TRANSLATIONS[AppState.language].opt_all_banks);
    populateSelect('districtExplorerSelect', Array.from(districts).sort(), '-- Choose District --');
    populateDistrictNavBar();
  }

  // --- DISTRICT NAVIGATION BAR HELPERS ---
  function populateDistrictNavBar() {
    const pillsContainer = document.getElementById('quickDistrictPills');
    const azContainer = document.getElementById('districtAzNav');
    if (!pillsContainer) return;

    const districtSet = new Set();
    AppState.allData.forEach(item => {
      if (item.district) districtSet.add(item.district);
    });

    const districts = Array.from(districtSet).sort();

    // Generate A-Z Alphabet Filter Bar
    if (azContainer) {
      const letters = new Set();
      districts.forEach(d => {
        const firstChar = d.charAt(0).toUpperCase();
        if (/[A-Z]/.test(firstChar)) letters.add(firstChar);
      });
      const sortedLetters = Array.from(letters).sort();

      azContainer.innerHTML = `<button class="btn btn-xs rounded-pill btn-primary az-btn active" onclick="App.filterDistrictNavByLetter('ALL')">ALL</button>` +
        sortedLetters.map(l => `<button class="btn btn-xs rounded-pill btn-outline-secondary az-btn" onclick="App.filterDistrictNavByLetter('${l}')">${l}</button>`).join('');
    }

    renderQuickDistrictPills(districts);
  }

  function renderQuickDistrictPills(districtsList) {
    const container = document.getElementById('quickDistrictPills');
    if (!container) return;

    const activeDist = document.getElementById('districtExplorerSelect')?.value || '';

    container.innerHTML = districtsList.map(d => {
      const count = AppState.allData.filter(i => i.district === d).length;
      const isActive = d === activeDist;
      return `
        <button class="district-pill-btn ${isActive ? 'active' : ''}" onclick="App.selectDistrictFromNav('${escapeJs(d)}')">
          <i class="fa-solid fa-map-pin text-danger me-1"></i>${sanitizeHtml(d)}
          <span class="badge bg-primary-subtle text-primary border rounded-pill ms-1">${count}</span>
        </button>
      `;
    }).join('');
  }

  function selectDistrictFromNav(districtName) {
    RouteWiseManager.switchDistrictMode('district');
    const select = document.getElementById('districtExplorerSelect');
    if (select) {
      select.value = districtName;
      select.dispatchEvent(new Event('change'));
    }
    const allDistricts = Array.from(new Set(AppState.allData.map(i => i.district).filter(Boolean))).sort();
    renderQuickDistrictPills(allDistricts);
  }

  function filterDistrictNavByLetter(letter) {
    document.querySelectorAll('.az-btn').forEach(btn => {
      btn.classList.toggle('btn-primary', btn.textContent === letter);
      btn.classList.toggle('btn-outline-secondary', btn.textContent !== letter);
    });

    const allDistricts = Array.from(new Set(AppState.allData.map(i => i.district).filter(Boolean))).sort();
    if (letter === 'ALL') {
      renderQuickDistrictPills(allDistricts);
    } else {
      const filtered = allDistricts.filter(d => d.toUpperCase().startsWith(letter));
      renderQuickDistrictPills(filtered);
    }
  }

  function populateSelect(id, items, defaultText) {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = `<option value="">${defaultText}</option>`;
    items.forEach(val => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = val;
      select.appendChild(opt);
    });
  }

  function applySearchFilters() {
    const stateVal = document.getElementById('filterState').value.toLowerCase();
    const districtVal = document.getElementById('filterDistrict').value.toLowerCase();
    const bankVal = document.getElementById('filterBank').value.toLowerCase();
    const branchVal = document.getElementById('filterBranch').value.toLowerCase().trim();
    const ifscVal = document.getElementById('filterIfsc').value.toLowerCase().trim();
    const micrVal = document.getElementById('filterMicr').value.toLowerCase().trim();
    const addressVal = document.getElementById('filterAddress').value.toLowerCase().trim();

    const filtered = AppState.allData.filter(item => {
      if (stateVal && (item.state || '').toLowerCase() !== stateVal) return false;
      if (districtVal && (item.district || '').toLowerCase() !== districtVal) return false;
      if (bankVal && (item.bank || '').toLowerCase() !== bankVal) return false;
      if (branchVal && !(item.branch || '').toLowerCase().includes(branchVal)) return false;
      if (ifscVal && !(item.ifsc || '').toLowerCase().includes(ifscVal)) return false;
      if (micrVal && !(item.micr || '').toLowerCase().includes(micrVal)) return false;
      if (addressVal && !(item.address || '').toLowerCase().includes(addressVal)) return false;
      return true;
    });

    AppState.filteredData = filtered;
    AppState.dataTable.clear().rows.add(filtered).draw();
    updateTableResultCount();

    // Increment Search Counter
    AppState.searchCount++;
    localStorage.setItem('bank_search_count', AppState.searchCount);
    document.getElementById('statSearchCount').textContent = AppState.searchCount.toLocaleString();

    // Log Recent Search
    if (branchVal || ifscVal || bankVal || districtVal) {
      const queryStr = [bankVal, branchVal, ifscVal, districtVal].filter(Boolean).join(' - ');
      logRecentSearch(queryStr);
    }
  }

  function resetSearchFilters() {
    document.getElementById('searchForm').reset();
    document.getElementById('filterBranch').value = '';
    document.getElementById('filterIfsc').value = '';
    document.getElementById('filterMicr').value = '';
    document.getElementById('filterAddress').value = '';

    AppState.filteredData = [...AppState.allData];
    AppState.dataTable.clear().rows.add(AppState.allData).draw();
    updateTableResultCount();
    showToast('Search filters reset');
  }

  // Auto suggestion for Branch Name textbox
  function initAutoSuggest() {
    const input = document.getElementById('filterBranch');
    const suggestBox = document.getElementById('suggestBranch');

    if (!input || !suggestBox) return;

    input.addEventListener('input', function () {
      const val = this.value.toLowerCase().trim();
      if (!val || val.length < 2) {
        suggestBox.style.display = 'none';
        return;
      }

      const matches = AppState.allData
        .map(i => i.branch)
        .filter((b, idx, self) => b && b.toLowerCase().includes(val) && self.indexOf(b) === idx)
        .slice(0, 8);

      if (matches.length === 0) {
        suggestBox.style.display = 'none';
        return;
      }

      suggestBox.innerHTML = matches.map(b => `<div class="auto-suggest-item">${sanitizeHtml(b)}</div>`).join('');
      suggestBox.style.display = 'block';
    });

    suggestBox.addEventListener('click', function (e) {
      if (e.target.classList.contains('auto-suggest-item')) {
        input.value = e.target.textContent;
        suggestBox.style.display = 'none';
        applySearchFilters();
      }
    });

    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !suggestBox.contains(e.target)) {
        suggestBox.style.display = 'none';
      }
    });
  }

  // --- DASHBOARD STATS & RECENT SEARCHES ---
  function updateDashboardStats() {
    const totalBranches = AppState.allData.length;
    const uniqueBanks = new Set(AppState.allData.map(i => i.bank)).size;
    const uniqueDistricts = new Set(AppState.allData.map(i => i.district)).size;

    const banksEl = document.getElementById('statTotalBanks');
    if (banksEl) banksEl.textContent = uniqueBanks.toLocaleString();

    const branchesEl = document.getElementById('statTotalBranches');
    if (branchesEl) branchesEl.textContent = totalBranches.toLocaleString();

    const districtsEl = document.getElementById('statTotalDistricts');
    if (districtsEl) districtsEl.textContent = uniqueDistricts.toLocaleString();

    const searchCountEl = document.getElementById('statSearchCount');
    if (searchCountEl) searchCountEl.textContent = AppState.searchCount.toLocaleString();

    const favCountEl = document.getElementById('badgeFavCount');
    if (favCountEl) favCountEl.textContent = AppState.favorites.size;

    renderTopBanksGrid();
    renderRecentSearches();
  }

  function renderTopBanksGrid() {
    const bankCounts = {};
    AppState.allData.forEach(item => {
      if (item.bank) {
        bankCounts[item.bank] = (bankCounts[item.bank] || 0) + 1;
      }
    });

    const sortedBanks = Object.entries(bankCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    const grid = document.getElementById('topBanksGrid');
    if (!grid) return;

    grid.innerHTML = sortedBanks.map(([bankName, count]) => `
      <div class="col-12 col-sm-6 col-md-4">
        <div class="p-3 border rounded-3 bg-body d-flex align-items-center justify-content-between shadow-sm cursor-pointer" onclick="App.filterByBank('${escapeJs(bankName)}')">
          <div>
            <div class="fw-bold text-truncate" style="max-width:140px;">${sanitizeHtml(bankName)}</div>
            <small class="text-muted">${count.toLocaleString()} Branches</small>
          </div>
          <i class="fa-solid fa-chevron-right text-muted"></i>
        </div>
      </div>
    `).join('');
  }

  function logRecentSearch(queryStr) {
    if (!queryStr) return;
    AppState.recentSearches = [queryStr, ...AppState.recentSearches.filter(q => q !== queryStr)].slice(0, 5);
    localStorage.setItem('bank_recent_searches', JSON.stringify(AppState.recentSearches));
    renderRecentSearches();
  }

  function renderRecentSearches() {
    const list = document.getElementById('recentSearchesList');
    if (!list) return;
    if (AppState.recentSearches.length === 0) {
      list.innerHTML = '<small class="text-muted">No recent searches yet.</small>';
      return;
    }

    list.innerHTML = AppState.recentSearches.map(q => `
      <span class="badge bg-light text-dark border p-2 text-start d-flex align-items-center justify-content-between cursor-pointer" onclick="App.runRecentSearch('${escapeJs(q)}')">
        <span class="text-truncate" style="max-width:200px;"><i class="fa-solid fa-clock-rotate-left me-1 text-primary"></i> ${sanitizeHtml(q)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square ms-2 text-muted" style="font-size:0.75rem;"></i>
      </span>
    `).join('');
  }

  // --- DISTRICT EXPLORER VIEW ---
  function initDistrictExplorer() {
    const distSelect = document.getElementById('districtExplorerSelect');
    const areaSelect = document.getElementById('districtAreaSelect');
    if (!distSelect || !areaSelect) return;

    function renderFilteredDistrictBranches() {
      const dist = distSelect.value;
      const area = areaSelect.value;
      const card = document.getElementById('districtStatsCard');
      const grid = document.getElementById('districtBranchGrid');

      if (!dist) {
        card.style.display = 'none';
        areaSelect.innerHTML = '<option value="">-- All Areas in District --</option>';
        areaSelect.disabled = true;
        grid.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="fa-solid fa-map-location-dot fs-1 mb-2"></i><p>Please select a district above to view bank branches.</p></div>';
        return;
      }
      let branches = AppState.allData.filter(i => i.district === dist);

      if (area) {
        branches = branches.filter(i => (i.branch || '').toLowerCase().includes(area.toLowerCase()) || (i.address || '').toLowerCase().includes(area.toLowerCase()));
      }

      const uniqueBanks = new Set(branches.map(i => i.bank)).size;

      document.getElementById('districtStatBranches').textContent = branches.length;
      document.getElementById('districtStatBanks').textContent = uniqueBanks;
      card.style.display = 'block';

      if (branches.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center text-muted py-4"><p>No branches found matching the selected area.</p></div>';
        return;
      }

      grid.innerHTML = branches.map(item => `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="glass-card h-100">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h6 class="fw-bold text-primary mb-0">${sanitizeHtml(item.bank)}</h6>
              <span class="badge-ifsc">${sanitizeHtml(item.ifsc)}</span>
            </div>
            <div class="fw-semibold text-dark mb-2">${sanitizeHtml(item.branch)}</div>
            <p class="text-muted small mb-2"><i class="fa-solid fa-location-dot me-1"></i>${sanitizeHtml(item.address)}</p>
            <div class="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
              <small class="text-muted">${sanitizeHtml(item.pincode || '')}</small>
              <button class="btn btn-sm btn-outline-primary rounded-pill" onclick="App.openQrModal('${escapeJs(item.ifsc)}')">
                Details & Maps
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    distSelect.addEventListener('change', function () {
      const dist = this.value;
      areaSelect.innerHTML = '<option value="">-- All Areas in District --</option>';

      if (dist) {
        const allDistBranches = AppState.allData.filter(i => i.district === dist);
        const areaSet = new Set();
        allDistBranches.forEach(b => {
          if (b.branch) areaSet.add(b.branch);
        });

        const sortedAreas = Array.from(areaSet).sort();
        sortedAreas.forEach(a => {
          const opt = document.createElement('option');
          opt.value = a;
          opt.textContent = a;
          areaSelect.appendChild(opt);
        });
        areaSelect.disabled = false;
      } else {
        areaSelect.disabled = true;
      }

      renderFilteredDistrictBranches();
    });

    areaSelect.addEventListener('change', function () {
      renderFilteredDistrictBranches();
    });

    // Initialize RouteWiseManager
    RouteWiseManager.init();
  }

  // --- ROUTE-WISE BANK DIRECTORY MANAGER ---
  const PRESET_ROUTES = {
    POLLACHI_PALANI: {
      id: 'POLLACHI_PALANI',
      nameEn: 'Pollachi to Palani Route',
      nameTa: 'பொள்ளாச்சி - பழனி வழித்தடம்',
      origin: 'Pollachi',
      destination: 'Palani',
      stops: ['Pollachi', 'Udumalaipettai', 'Madathukulam', 'Palani'],
      distance: '~66 km',
      highway: 'NH83 Pollachi-Dindigul Highway',
      stopDistances: { 'Pollachi': '0 km', 'Udumalaipettai': '28 km', 'Madathukulam': '42 km', 'Palani': '66 km' }
    },
    COIMBATORE_POLLACHI: {
      id: 'COIMBATORE_POLLACHI',
      nameEn: 'Coimbatore to Pollachi Route',
      nameTa: 'கோயம்புத்தூர் - பொள்ளாச்சி வழித்தடம்',
      origin: 'Coimbatore',
      destination: 'Pollachi',
      stops: ['Coimbatore', 'Eachanari', 'Kinathukadavu', 'Pollachi'],
      distance: '~44 km',
      highway: 'NH83 Coimbatore-Pollachi Highway',
      stopDistances: { 'Coimbatore': '0 km', 'Eachanari': '10 km', 'Kinathukadavu': '22 km', 'Pollachi': '44 km' }
    },
    MADURAI_PALANI: {
      id: 'MADURAI_PALANI',
      nameEn: 'Madurai to Palani Route',
      nameTa: 'மதுரை - பழனி வழித்தடம்',
      origin: 'Madurai',
      destination: 'Palani',
      stops: ['Madurai', 'Vadipatti', 'Dindigul', 'Palani'],
      distance: '~115 km',
      highway: 'NH44 & NH83 Route',
      stopDistances: { 'Madurai': '0 km', 'Vadipatti': '28 km', 'Dindigul': '64 km', 'Palani': '115 km' }
    },
    CHENNAI_KANCHIPURAM: {
      id: 'CHENNAI_KANCHIPURAM',
      nameEn: 'Chennai to Kanchipuram Route',
      nameTa: 'சென்னை - காஞ்சிபுரம் வழித்தடம்',
      origin: 'Chennai',
      destination: 'Kanchipuram',
      stops: ['Chennai', 'Tambaram', 'Sriperumbudur', 'Kanchipuram'],
      distance: '~75 km',
      highway: 'NH48 Expressway',
      stopDistances: { 'Chennai': '0 km', 'Tambaram': '28 km', 'Sriperumbudur': '42 km', 'Kanchipuram': '75 km' }
    },
    SALEM_ERODE: {
      id: 'SALEM_ERODE',
      nameEn: 'Salem to Erode Route',
      nameTa: 'சேலம் - ஈரோடு வழித்தடம்',
      origin: 'Salem',
      destination: 'Erode',
      stops: ['Salem', 'Sankari', 'Bhavani', 'Erode'],
      distance: '~64 km',
      highway: 'NH544 Salem-Kochi Highway',
      stopDistances: { 'Salem': '0 km', 'Sankari': '32 km', 'Bhavani': '52 km', 'Erode': '64 km' }
    }
  };

  const RouteWiseManager = {
    activeRouteId: 'POLLACHI_PALANI',
    activeStopFilter: 'ALL',
    currentRouteData: null,

    init: function () {
      this.populateRouteDropdowns();
      this.bindEvents();
      this.loadPresetRoute(this.activeRouteId || 'POLLACHI_PALANI');
    },

    switchDistrictMode: function (mode) {
      const distContainer = document.getElementById('districtExplorerContainer');
      const routeContainer = document.getElementById('routeExplorerContainer');
      const btnDist = document.getElementById('btnModeDistrict');
      const btnRoute = document.getElementById('btnModeRoute');

      if (mode === 'district') {
        if (distContainer) distContainer.style.display = 'block';
        if (routeContainer) routeContainer.style.display = 'none';
        if (btnDist) btnDist.className = 'btn btn-sm rounded-pill active-mode-btn px-3 fw-semibold';
        if (btnRoute) btnRoute.className = 'btn btn-sm rounded-pill px-3 fw-semibold text-muted';
      } else {
        if (distContainer) distContainer.style.display = 'none';
        if (routeContainer) routeContainer.style.display = 'block';
        if (btnDist) btnDist.className = 'btn btn-sm rounded-pill px-3 fw-semibold text-muted';
        if (btnRoute) btnRoute.className = 'btn btn-sm rounded-pill active-mode-btn px-3 fw-semibold';
        this.init();
      }
    },

    populateRouteDropdowns: function () {
      const originSelect = document.getElementById('routeOriginSelect');
      const destSelect = document.getElementById('routeDestSelect');
      if (!originSelect || !destSelect) return;

      const townsSet = new Set(['Pollachi', 'Palani', 'Udumalaipettai', 'Madathukulam', 'Coimbatore', 'Madurai', 'Dindigul', 'Chennai', 'Salem', 'Erode', 'Karur', 'Kinathukadavu']);
      
      AppState.allData.forEach(b => {
        if (b.district) townsSet.add(b.district);
        if (b.branch) {
          const firstWord = b.branch.split(' ')[0];
          if (firstWord && firstWord.length > 3) townsSet.add(firstWord);
        }
      });

      const sortedTowns = Array.from(townsSet).sort();

      const curOrigin = originSelect.value || 'Pollachi';
      const curDest = destSelect.value || 'Palani';

      originSelect.innerHTML = sortedTowns.map(t => `<option value="${t}" ${t === curOrigin ? 'selected' : ''}>${t}</option>`).join('');
      destSelect.innerHTML = sortedTowns.map(t => `<option value="${t}" ${t === curDest ? 'selected' : ''}>${t}</option>`).join('');
    },

    bindEvents: function () {
      const btnSwap = document.getElementById('btnSwapRoute');
      const btnSearch = document.getElementById('btnSearchRouteBanks');

      if (btnSwap) {
        btnSwap.onclick = () => {
          const originSelect = document.getElementById('routeOriginSelect');
          const destSelect = document.getElementById('routeDestSelect');
          if (originSelect && destSelect) {
            const temp = originSelect.value;
            originSelect.value = destSelect.value;
            destSelect.value = temp;
            this.searchCustomRoute();
          }
        };
      }

      if (btnSearch) {
        btnSearch.onclick = () => this.searchCustomRoute();
      }
    },

    loadPresetRoute: function (routeId) {
      const preset = PRESET_ROUTES[routeId];
      if (!preset) return;

      this.activeRouteId = routeId;
      this.activeStopFilter = 'ALL';

      document.querySelectorAll('.preset-route-chip').forEach(c => c.classList.remove('active'));
      const activeChip = document.getElementById(`chip_${routeId}`);
      if (activeChip) activeChip.classList.add('active');

      const originSelect = document.getElementById('routeOriginSelect');
      const destSelect = document.getElementById('routeDestSelect');
      if (originSelect) originSelect.value = preset.origin;
      if (destSelect) destSelect.value = preset.destination;

      this.processAndRenderRoute(preset);
    },

    searchCustomRoute: function () {
      const origin = document.getElementById('routeOriginSelect').value;
      const dest = document.getElementById('routeDestSelect').value;

      let matchedPreset = Object.values(PRESET_ROUTES).find(p => 
        (p.origin.toLowerCase() === origin.toLowerCase() && p.destination.toLowerCase() === dest.toLowerCase()) ||
        (p.origin.toLowerCase() === dest.toLowerCase() && p.destination.toLowerCase() === origin.toLowerCase())
      );

      if (matchedPreset) {
        if (origin.toLowerCase() === matchedPreset.destination.toLowerCase()) {
          const reversedStops = [...matchedPreset.stops].reverse();
          const routeObj = {
            id: matchedPreset.id + '_REV',
            nameEn: `${origin} to ${dest} Route`,
            nameTa: `${origin} - ${dest} வழித்தடம்`,
            origin: origin,
            destination: dest,
            stops: reversedStops,
            distance: matchedPreset.distance,
            highway: matchedPreset.highway,
            stopDistances: matchedPreset.stopDistances
          };
          this.processAndRenderRoute(routeObj);
          return;
        }
        this.loadPresetRoute(matchedPreset.id);
        return;
      }

      const stops = [origin, dest];
      const customRouteObj = {
        id: 'CUSTOM',
        nameEn: `${origin} to ${dest} Transit Route`,
        nameTa: `${origin} - ${dest} வழித்தடம்`,
        origin: origin,
        destination: dest,
        stops: stops,
        distance: '~ Direct Route',
        highway: 'Highway Route',
        stopDistances: { [origin]: 'Start', [dest]: 'End' }
      };

      this.processAndRenderRoute(customRouteObj);
    },

    processAndRenderRoute: function (routeObj) {
      this.currentRouteData = routeObj;

      const stopBranchMap = {};
      let totalBranchesCount = 0;
      const bankNetworksSet = new Set();

      routeObj.stops.forEach(stop => {
        const stopLower = stop.toLowerCase();
        const branches = AppState.allData.filter(b => {
          const bBranch = (b.branch || '').toLowerCase();
          const bDist = (b.district || '').toLowerCase();
          const bAddr = (b.address || '').toLowerCase();

          return bBranch.includes(stopLower) || bDist.includes(stopLower) || bAddr.includes(stopLower);
        });

        stopBranchMap[stop] = branches;
        totalBranchesCount += branches.length;
        branches.forEach(b => { if (b.bank) bankNetworksSet.add(b.bank); });
      });

      routeObj.stopBranchMap = stopBranchMap;
      routeObj.totalBranches = totalBranchesCount;
      routeObj.totalNetworks = bankNetworksSet.size;

      const titleEl = document.getElementById('routeHeaderTitle');
      const subTextEl = document.getElementById('routeSubText');
      if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-route me-2"></i>${sanitizeHtml(routeObj.nameEn)}`;
      if (subTextEl) subTextEl.textContent = `${routeObj.highway} | ${routeObj.distance} | ${routeObj.stops.length} Main Highway Towns`;

      document.getElementById('statRouteDistance').textContent = routeObj.distance;
      document.getElementById('statRouteTotalBranches').textContent = totalBranchesCount;
      document.getElementById('statRouteTotalNetworks').textContent = bankNetworksSet.size;
      document.getElementById('statRouteStopsCount').textContent = `${routeObj.stops.length} Towns`;

      this.renderTimeline(routeObj);
      this.renderStopFilterPills(routeObj);
      this.renderRouteBranchGrid();
    },

    renderTimeline: function (routeObj) {
      const container = document.getElementById('routeTimelineNodes');
      if (!container) return;

      container.innerHTML = routeObj.stops.map((stop, idx) => {
        const count = (routeObj.stopBranchMap[stop] || []).length;
        const distLabel = routeObj.stopDistances[stop] || '';
        const isOrigin = idx === 0;
        const isDest = idx === routeObj.stops.length - 1;
        const iconClass = isOrigin ? 'fa-flag-checkered text-success' : isDest ? 'fa-location-dot text-danger' : 'fa-building-columns text-primary';
        const isActive = this.activeStopFilter === stop;

        return `
          <div class="route-step-node ${isActive ? 'active' : ''}" onclick="App.RouteWiseManager.filterByStop('${escapeJs(stop)}')">
            ${distLabel ? `<span class="route-dist-badge">${distLabel}</span>` : ''}
            <div class="route-step-circle">
              <i class="fa-solid ${iconClass}"></i>
            </div>
            <div class="route-step-title">${sanitizeHtml(stop)}</div>
            <div class="route-step-count text-muted"><span class="badge bg-primary-subtle text-primary border rounded-pill">${count} Banks</span></div>
          </div>
        `;
      }).join('');
    },

    renderStopFilterPills: function (routeObj) {
      const container = document.getElementById('routeStopFilterPills');
      if (!container) return;

      let html = `<button class="btn btn-sm rounded-pill ${this.activeStopFilter === 'ALL' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="App.RouteWiseManager.filterByStop('ALL')">
        All Route Branches (${routeObj.totalBranches})
      </button>`;

      routeObj.stops.forEach(stop => {
        const count = (routeObj.stopBranchMap[stop] || []).length;
        const isActive = this.activeStopFilter === stop;
        html += `<button class="btn btn-sm rounded-pill ${isActive ? 'btn-primary' : 'btn-outline-secondary'}" onclick="App.RouteWiseManager.filterByStop('${escapeJs(stop)}')">
          ${sanitizeHtml(stop)} (${count})
        </button>`;
      });

      container.innerHTML = html;
    },

    filterByStop: function (stopName) {
      this.activeStopFilter = stopName;
      if (this.currentRouteData) {
        this.renderTimeline(this.currentRouteData);
        this.renderStopFilterPills(this.currentRouteData);
        this.renderRouteBranchGrid();
      }
    },

    renderRouteBranchGrid: function () {
      const grid = document.getElementById('routeBranchGrid');
      const countEl = document.getElementById('routeFilteredCountText');
      if (!grid || !this.currentRouteData) return;

      let branchesToDisplay = [];

      if (this.activeStopFilter === 'ALL') {
        this.currentRouteData.stops.forEach(stop => {
          const list = this.currentRouteData.stopBranchMap[stop] || [];
          list.forEach(b => {
            branchesToDisplay.push({ ...b, routeStop: stop });
          });
        });
      } else {
        const list = this.currentRouteData.stopBranchMap[this.activeStopFilter] || [];
        list.forEach(b => {
          branchesToDisplay.push({ ...b, routeStop: this.activeStopFilter });
        });
      }

      if (countEl) {
        countEl.textContent = `Displaying ${branchesToDisplay.length} bank branches along route`;
      }

      if (branchesToDisplay.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="fa-solid fa-building-circle-xmark fs-1 mb-2"></i><p>No bank branches found for this specific route stop.</p></div>';
        return;
      }

      grid.innerHTML = branchesToDisplay.map(item => `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="glass-card h-100 d-flex flex-column position-relative">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <span class="badge bg-secondary-subtle text-dark border rounded-pill small mb-1">
                  <i class="fa-solid fa-map-pin me-1 text-danger"></i>${sanitizeHtml(item.routeStop)} Stop
                </span>
                <h6 class="fw-bold text-primary mb-0">${sanitizeHtml(item.bank)}</h6>
              </div>
              <span class="badge-ifsc">${sanitizeHtml(item.ifsc)}</span>
            </div>
            
            <div class="fw-semibold text-dark mb-1">${sanitizeHtml(item.branch)}</div>
            <p class="text-muted small mb-2 flex-grow-1"><i class="fa-solid fa-location-dot me-1 text-primary"></i>${sanitizeHtml(item.address)}</p>
            
            <div class="d-flex align-items-center justify-content-between text-muted small border-top pt-2 mb-2" style="font-size:0.78rem;">
              <span><i class="fa-solid fa-city me-1"></i>${sanitizeHtml(item.district)}</span>
              <span><i class="fa-solid fa-phone me-1 text-success"></i>${sanitizeHtml(item.phone || 'Available')}</span>
            </div>

            <div class="d-flex gap-2 pt-2 border-top">
              <button class="btn btn-sm btn-outline-secondary rounded-pill flex-fill" onclick="App.copyToClipboard('${escapeJs(item.ifsc)}', 'IFSC Copied!')">
                <i class="fa-regular fa-copy me-1"></i> Copy IFSC
              </button>
              <button class="btn btn-sm btn-outline-primary rounded-pill flex-fill" onclick="App.openQrModal('${escapeJs(item.ifsc)}')">
                <i class="fa-solid fa-qrcode me-1"></i> Details & Maps
              </button>
            </div>
          </div>
        </div>
      `).join('');
    },

    openGoogleMapsRoute: function () {
      if (!this.currentRouteData) return;
      const origin = encodeURIComponent(this.currentRouteData.origin);
      const dest = encodeURIComponent(this.currentRouteData.destination);
      const waypoints = this.currentRouteData.stops.slice(1, -1).map(s => encodeURIComponent(s)).join('/');
      
      let url = `https://www.google.com/maps/dir/${origin}/`;
      if (waypoints) url += `${waypoints}/`;
      url += dest;

      window.open(url, '_blank');
    },

    exportRouteExcel: function () {
      if (!this.currentRouteData) return;
      const exportData = [];

      this.currentRouteData.stops.forEach(stop => {
        const list = this.currentRouteData.stopBranchMap[stop] || [];
        list.forEach(b => {
          exportData.push({
            "Route Stop": stop,
            "Bank Name": b.bank,
            "Branch": b.branch,
            "IFSC": b.ifsc,
            "MICR": b.micr || '-',
            "District": b.district,
            "State": b.state,
            "Address": b.address,
            "Pincode": b.pincode || '-',
            "Phone": b.phone || '-'
          });
        });
      });

      if (typeof XLSX !== 'undefined') {
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `${this.currentRouteData.origin}_${this.currentRouteData.destination}_Banks`);
        XLSX.writeFile(workbook, `Route_Bank_Details_${this.currentRouteData.origin}_to_${this.currentRouteData.destination}.xlsx`);
        showToast('Exported route bank details to Excel!');
      } else {
        showToast('Excel exporter unavailable.');
      }
    }
  };

  window.App.RouteWiseManager = RouteWiseManager;

  // --- BANK EXPLORER VIEW ---
  function initBankExplorer() {
    const grid = document.getElementById('bankExplorerGrid');
    if (!grid) return;

    const bankCounts = {};
    AppState.allData.forEach(item => {
      if (item.bank) bankCounts[item.bank] = (bankCounts[item.bank] || 0) + 1;
    });

    grid.innerHTML = Object.entries(bankCounts).map(([bankName, count]) => `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="glass-card text-center p-3 cursor-pointer h-100 border-hover" onclick="App.showBankBranches('${escapeJs(bankName)}')" title="Click to view all ${sanitizeHtml(bankName)} branches">
          <div class="sidebar-brand-logo mx-auto mb-2" style="width:48px;height:48px;font-size:1.4rem;background:var(--primary-gradient);">
            <i class="fa-solid fa-building-columns"></i>
          </div>
          <h6 class="fw-bold text-dark mb-1 text-truncate">${sanitizeHtml(bankName)}</h6>
          <span class="badge bg-primary rounded-pill mb-2">${count.toLocaleString()} Branches</span>
          <div class="mt-2">
            <button class="btn btn-sm btn-outline-primary rounded-pill w-100 fw-semibold" style="font-size:0.75rem;">
              <i class="fa-solid fa-list me-1"></i> View All Branches
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function showBankBranches(bankName) {
    const title = document.getElementById('dedicatedBankTitle');
    const subtext = document.getElementById('dedicatedBankSubtext');
    const grid = document.getElementById('dedicatedBankBranchGrid');

    const branches = AppState.allData.filter(i => i.bank === bankName);

    if (title) title.textContent = bankName;
    if (subtext) subtext.textContent = `Showing all ${branches.length.toLocaleString()} operating branches across India`;

    if (grid) {
      if (branches.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center text-muted py-5"><p>No branches found for this bank.</p></div>';
      } else {
        grid.innerHTML = branches.map(item => `
          <div class="col-12 col-md-6 col-lg-4">
            <div class="glass-card h-100 d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="fw-bold text-primary mb-0">${sanitizeHtml(item.branch)}</h6>
                <span class="badge-ifsc">${sanitizeHtml(item.ifsc)}</span>
              </div>
              <small class="text-muted d-block mb-2"><i class="fa-solid fa-map-pin text-danger me-1"></i>${sanitizeHtml(item.district)}, ${sanitizeHtml(item.state)}</small>
              <p class="small text-muted mb-3 flex-grow-1"><i class="fa-solid fa-location-dot me-1"></i>${sanitizeHtml(item.address)}</p>
              <div class="d-flex gap-2 mt-auto pt-2 border-top">
                <button class="btn btn-sm btn-outline-secondary rounded-pill flex-fill" onclick="App.copyToClipboard('${escapeJs(item.ifsc)}', 'IFSC Copied!')">
                  <i class="fa-regular fa-copy me-1"></i> IFSC
                </button>
                <button class="btn btn-sm btn-outline-primary rounded-pill flex-fill" onclick="App.openQrModal('${escapeJs(item.ifsc)}')">
                  <i class="fa-solid fa-qrcode me-1"></i> Details
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    switchView('bank-branches');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeBankDetail() {
    document.getElementById('bankDetailContainer').style.display = 'none';
  }

  // --- FAVORITES / BOOKMARKS VIEW ---
  function toggleFavorite(ifsc) {
    if (AppState.favorites.has(ifsc)) {
      AppState.favorites.delete(ifsc);
      showToast('Removed from saved bookmarks');
    } else {
      AppState.favorites.add(ifsc);
      showToast('Saved to bookmarks!');
    }
    localStorage.setItem('bank_favorites', JSON.stringify(Array.from(AppState.favorites)));
    document.getElementById('badgeFavCount').textContent = AppState.favorites.size;
    AppState.dataTable.draw(false);
    renderFavorites();
  }

  function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const clearBtn = document.getElementById('btnClearFavorites');
    if (!grid) return;

    const favList = AppState.allData.filter(i => AppState.favorites.has(i.ifsc));

    if (favList.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="fa-regular fa-star fs-1 mb-2"></i><p>No saved branches yet. Click the star icon on any table row to bookmark branches.</p></div>';
      if (clearBtn) clearBtn.style.display = 'none';
      return;
    }

    if (clearBtn) clearBtn.style.display = 'inline-block';

    grid.innerHTML = favList.map(item => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="glass-card h-100 position-relative">
          <button class="btn btn-sm btn-link text-danger position-absolute top-0 end-0 m-2" onclick="App.toggleFavorite('${item.ifsc}')" title="Remove">
            <i class="fa-solid fa-xmark fs-5"></i>
          </button>
          <h6 class="fw-bold text-primary pe-4 mb-1">${sanitizeHtml(item.bank)}</h6>
          <div class="fw-semibold text-dark mb-2">${sanitizeHtml(item.branch)}</div>
          <div class="mb-2"><span class="badge-ifsc">${sanitizeHtml(item.ifsc)}</span></div>
          <p class="text-muted small mb-3"><i class="fa-solid fa-location-dot me-1"></i>${sanitizeHtml(item.address)}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="App.copyToClipboard('${escapeJs(item.ifsc)}', 'IFSC Copied!')">
              <i class="fa-regular fa-copy me-1"></i> IFSC
            </button>
            <button class="btn btn-sm btn-outline-primary rounded-pill" onclick="App.openQrModal('${escapeJs(item.ifsc)}')">
              <i class="fa-solid fa-qrcode me-1"></i> Details
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- EXPORT MANAGER (Excel, PDF, CSV, Print) ---
  const ExportManager = {
    fullExcel: function () {
      const dataToExport = AppState.filteredData.length > 0 ? AppState.filteredData : AppState.allData;
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bank Directory");
      XLSX.writeFile(workbook, `BankDirectory_Export_${new Date().toISOString().slice(0, 10)}.xlsx`);
      showToast('Exported dataset to Excel (.xlsx)');
    },
    fullPdf: function () {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('landscape');

      doc.setFontSize(16);
      doc.text("Bank Directory Search System - Branch Report", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()} | Total Records: ${AppState.filteredData.length}`, 14, 22);

      const tableData = (AppState.filteredData.length > 0 ? AppState.filteredData : AppState.allData).map(row => [
        row.bank, row.branch, row.ifsc, row.micr || '-', row.district, row.state, row.phone || '-'
      ]);

      doc.autoTable({
        head: [['Bank', 'Branch', 'IFSC', 'MICR', 'District', 'State', 'Phone']],
        body: tableData,
        startY: 28,
        theme: 'striped',
        headStyles: { fillColor: [30, 58, 138] }
      });

      doc.save(`BankDirectory_Export_${new Date().toISOString().slice(0, 10)}.pdf`);
      showToast('Exported dataset to PDF');
    },
    fullCsv: function () {
      const dataToExport = AppState.filteredData.length > 0 ? AppState.filteredData : AppState.allData;
      if (dataToExport.length === 0) return;

      const headers = Object.keys(dataToExport[0]);
      const csvRows = [headers.join(',')];

      dataToExport.forEach(row => {
        const values = headers.map(header => {
          const val = row[header] || '';
          return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
      });

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `BankDirectory_Export_${new Date().toISOString().slice(0, 10)}.csv`);
      a.click();
      showToast('Exported dataset to CSV');
    }
  };

  // --- ADMIN MANAGER (CRUD, Batch File Import, Backup & Restore) ---
  const AdminManager = {
    openLoginModal: function () {
      const errEl = document.getElementById('adminLoginErrorAlert');
      if (errEl) errEl.style.display = 'none';
      const form = document.getElementById('adminLoginForm');
      if (form) form.reset();
      const modal = new bootstrap.Modal(document.getElementById('superAdminLoginModal'));
      modal.show();
    },
    loginSuperAdmin: function (email, password) {
      const errEl = document.getElementById('adminLoginErrorAlert');
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();

      if (cleanEmail === 'vikir0200@gmail.com' && cleanPassword === 'VIKI1101') {
        AppState.isAdminLoggedIn = true;
        sessionStorage.setItem('bank_super_admin_session', 'true');

        const modalEl = document.getElementById('superAdminLoginModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }

        AdminManager.updateAdminUI();
        showToast('Authenticated as Super Admin (VIKIR0200@GMAIL.COM)');
      } else {
        if (errEl) {
          errEl.textContent = 'Invalid Super Admin Email or Password! Access Denied.';
          errEl.style.display = 'block';
        }
      }
    },
    logoutSuperAdmin: function () {
      AppState.isAdminLoggedIn = false;
      sessionStorage.removeItem('bank_super_admin_session');
      AdminManager.updateAdminUI();
      showToast('Logged out from Super Admin session');
    },
    updateAdminUI: function () {
      const lockedCard = document.getElementById('adminLockedCard');
      const contentContainer = document.getElementById('adminContentContainer');
      const badgeContainer = document.getElementById('adminAuthBadgeContainer');

      const navItem = document.getElementById('sidebarAdminNavItem');
      const settingsNavItem = document.getElementById('sidebarSettingsNavItem');

      if (AppState.isAdminLoggedIn || (AppState.currentUser && AppState.currentUser.role === 'Super Admin')) {
        if (lockedCard) lockedCard.style.display = 'none';
        if (contentContainer) contentContainer.style.display = 'block';
        if (navItem) navItem.style.display = 'block';
        if (settingsNavItem) settingsNavItem.style.display = 'block';
        if (badgeContainer) {
          badgeContainer.innerHTML = `
            <div class="badge bg-success p-2 px-3 rounded-pill d-flex align-items-center gap-2 shadow-sm">
              <i class="fa-solid fa-user-check"></i>
              <span>Super Admin Active (vikir0200@gmail.com)</span>
              <button class="btn btn-sm btn-dark rounded-pill py-0 px-2 text-white ms-2" onclick="App.AdminManager.logoutSuperAdmin()">Logout</button>
            </div>`;
        }
        // Auto-load pending user reports
        AdminManager.loadReports();
      } else {
        if (lockedCard) lockedCard.style.display = 'block';
        if (contentContainer) contentContainer.style.display = 'none';
        if (navItem) navItem.style.display = 'none';
        if (settingsNavItem) settingsNavItem.style.display = 'none';
        if (badgeContainer) {
          badgeContainer.innerHTML = `
            <span class="badge bg-danger p-2 px-3 rounded-pill shadow-sm" onclick="App.AdminManager.openLoginModal()" style="cursor:pointer;">
              <i class="fa-solid fa-lock me-1"></i> Super Admin Restricted
            </span>`;
        }
      }
    },
    reportsFilterMode: 'all',
    setReportsFilter: function (mode, btnEl) {
      AdminManager.reportsFilterMode = mode;
      const group = document.getElementById('reportsFilterGroup');
      if (group) {
        group.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
      }
      if (btnEl) btnEl.classList.add('active');
      AdminManager.loadReports();
    },
    loadReports: function () {
      const list = document.getElementById('adminReportsList');
      const badgePending = document.getElementById('pendingReportsCount');
      const badgeDuplicate = document.getElementById('duplicateReportsCount');
      if (!list) return;

      const reports = JSON.parse(localStorage.getItem('bank_user_reports') || '[]');

      let pendingCount = 0;
      let duplicateCount = 0;

      const processedReports = reports.map(r => {
        const cleanIfsc = (r.ifsc || '').trim().toUpperCase();
        const cleanBank = (r.bank || '').trim().toLowerCase();
        const cleanBranch = (r.branch || '').trim().toLowerCase();
        const cleanDistrict = (r.district || '').trim().toLowerCase();

        const existingByIfsc = AppState.allData.find(b => (b.ifsc || '').trim().toUpperCase() === cleanIfsc);
        const existingByName = AppState.allData.find(b =>
          (b.bank || '').trim().toLowerCase() === cleanBank &&
          (b.branch || '').trim().toLowerCase() === cleanBranch &&
          (b.district || '').trim().toLowerCase() === cleanDistrict
        );

        const existingMatch = existingByIfsc || existingByName;
        const matchReason = existingByIfsc ? 'IFSC Match' : (existingByName ? 'Name & District Match' : null);
        const isDuplicate = !!existingMatch;

        if (r.status === 'Pending') {
          pendingCount++;
          if (isDuplicate) duplicateCount++;
        }

        return { ...r, isDuplicate, existingMatch, matchReason };
      });

      if (badgePending) badgePending.textContent = `${pendingCount} Pending`;
      if (badgeDuplicate) badgeDuplicate.textContent = `${duplicateCount} Duplicates`;

      let filteredReports = processedReports;
      if (AdminManager.reportsFilterMode === 'duplicates') {
        filteredReports = processedReports.filter(r => r.isDuplicate);
      } else if (AdminManager.reportsFilterMode === 'pending') {
        filteredReports = processedReports.filter(r => r.status === 'Pending');
      }

      if (filteredReports.length === 0) {
        list.innerHTML = `
          <div class="text-center text-muted py-4">
            <i class="fa-solid fa-inbox fa-2x mb-2 d-block opacity-50"></i>
            <small>${AdminManager.reportsFilterMode === 'duplicates' ? 'No duplicate submissions detected.' : 'No user submissions found.'}</small>
          </div>`;
        return;
      }

      list.innerHTML = filteredReports.map(r => `
        <div class="border rounded-3 p-3 mb-3 ${r.isDuplicate && r.status === 'Pending' ? 'border-warning shadow-sm' : ''}" style="${r.isDuplicate && r.status === 'Pending' ? 'background:rgba(255,193,7,0.04);' : ''}" id="report-row-${r.id}">
          <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
            <div>
              <strong class="fs-6">${sanitizeHtml(r.bank)}</strong>
              <span class="text-muted ms-1">—</span>
              <span class="ms-1">${sanitizeHtml(r.branch)}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              ${r.isDuplicate ? `<span class="badge bg-warning text-dark border border-warning px-2 py-1"><i class="fa-solid fa-triangle-exclamation me-1"></i> DUPLICATE DETECTED (${r.matchReason})</span>` : ''}
              <span class="badge rounded-pill px-3 py-1 ${r.status.startsWith('Approved') ? 'bg-success' : r.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}">${sanitizeHtml(r.status)}</span>
              <button class="btn btn-outline-danger btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center ms-1" onclick="App.AdminManager.deleteReport(${r.id})" title="Super Admin [vikir0200@gmail.com]: Delete Submission Record" style="width:28px;height:28px;">
                <i class="fa-solid fa-trash-can" style="font-size:0.75rem;"></i>
              </button>
            </div>
          </div>

          <div class="row g-2 mb-2 small text-muted">
            <div class="col-6 col-md-3"><i class="fa-solid fa-tag me-1 text-primary"></i><strong>IFSC:</strong> ${sanitizeHtml(r.ifsc)}</div>
            <div class="col-6 col-md-3"><i class="fa-solid fa-map-pin me-1 text-danger"></i>${sanitizeHtml(r.district)}, ${sanitizeHtml(r.state)}</div>
            <div class="col-6 col-md-3"><i class="fa-regular fa-user me-1"></i>${sanitizeHtml(r.submittedBy)}</div>
            <div class="col-6 col-md-3"><i class="fa-regular fa-clock me-1"></i>${r.submittedAt}</div>
          </div>
          <div class="small text-muted mb-2"><i class="fa-solid fa-location-dot me-1"></i>${sanitizeHtml(r.address)}${r.pincode ? ' – ' + sanitizeHtml(r.pincode) : ''}</div>
          ${r.notes ? `<div class="small text-muted mb-2"><i class="fa-solid fa-note-sticky me-1"></i>${sanitizeHtml(r.notes)}</div>` : ''}

          ${r.isDuplicate && r.existingMatch ? `
          <div class="alert alert-warning py-2 px-3 small mb-2 rounded-3 border-warning bg-light">
            <div class="fw-bold mb-1 text-dark"><i class="fa-solid fa-database me-1 text-warning"></i> Existing Database Record (${r.matchReason}):</div>
            <div class="row g-1 text-muted" style="font-size:0.78rem;">
              <div class="col-12 col-md-4"><strong>IFSC:</strong> ${sanitizeHtml(r.existingMatch.ifsc)}</div>
              <div class="col-12 col-md-4"><strong>Bank:</strong> ${sanitizeHtml(r.existingMatch.bank)}</div>
              <div class="col-12 col-md-4"><strong>Branch:</strong> ${sanitizeHtml(r.existingMatch.branch)}</div>
              <div class="col-12 col-md-4"><strong>District:</strong> ${sanitizeHtml(r.existingMatch.district)}, ${sanitizeHtml(r.existingMatch.state)}</div>
              <div class="col-12 col-md-8"><strong>Address:</strong> ${sanitizeHtml(r.existingMatch.address)}</div>
            </div>
          </div>` : ''}

          <div class="d-flex flex-wrap gap-2 mt-2 pt-2 border-top">
            ${r.status === 'Pending' ? `
              ${r.isDuplicate ? `
                <button class="btn btn-warning btn-sm rounded-pill px-3 fw-semibold text-dark" onclick="App.AdminManager.approveReport(${r.id}, 'overwrite')">
                  <i class="fa-solid fa-arrows-rotate me-1"></i> Overwrite & Update Existing Record
                </button>
                <button class="btn btn-outline-secondary btn-sm rounded-pill px-3" onclick="App.AdminManager.approveReport(${r.id}, 'add_duplicate')">
                  <i class="fa-solid fa-plus me-1"></i> Add as New Entry Anyway
                </button>
              ` : `
                <button class="btn btn-success btn-sm rounded-pill px-3 fw-semibold" onclick="App.AdminManager.approveReport(${r.id}, 'auto')">
                  <i class="fa-solid fa-check me-1"></i> Approve & Add to Directory
                </button>
              `}
              <button class="btn btn-outline-danger btn-sm rounded-pill px-3" onclick="App.AdminManager.rejectReport(${r.id})">
                <i class="fa-solid fa-xmark me-1"></i> Reject Submission
              </button>
            ` : ''}
            <button class="btn btn-outline-danger btn-sm rounded-pill px-3 ms-auto" onclick="App.AdminManager.deleteReport(${r.id})">
              <i class="fa-solid fa-trash-can me-1"></i> Delete Record
            </button>
          </div>
        </div>
      `).join('');
    },
    approveReport: function (id, actionType = 'auto') {
      const reports = JSON.parse(localStorage.getItem('bank_user_reports') || '[]');
      const idx = reports.findIndex(r => r.id === id);
      if (idx === -1) return;

      const r = reports[idx];
      const cleanIfsc = (r.ifsc || '').trim().toUpperCase();
      const cleanBank = (r.bank || '').trim().toLowerCase();
      const cleanBranch = (r.branch || '').trim().toLowerCase();
      const cleanDistrict = (r.district || '').trim().toLowerCase();

      const existingIdx = AppState.allData.findIndex(b =>
        (b.ifsc || '').trim().toUpperCase() === cleanIfsc ||
        ((b.bank || '').trim().toLowerCase() === cleanBank &&
         (b.branch || '').trim().toLowerCase() === cleanBranch &&
         (b.district || '').trim().toLowerCase() === cleanDistrict)
      );

      const newBranch = {
        bank: r.bank, branch: r.branch, ifsc: r.ifsc,
        micr: r.micr || '', district: r.district, state: r.state,
        address: r.address, pincode: r.pincode || '',
        phone: r.phone || '', email: r.email || ''
      };

      if (actionType === 'overwrite' || (actionType === 'auto' && existingIdx !== -1)) {
        if (existingIdx !== -1) {
          AppState.allData[existingIdx] = newBranch;
          reports[idx].status = 'Approved (Updated Existing)';
          showToast(`✅ Existing branch "${r.branch}" (IFSC: ${r.ifsc}) updated in directory!`);
        } else {
          AppState.allData.unshift(newBranch);
          reports[idx].status = 'Approved';
          showToast(`✅ Branch "${r.branch}" added to directory!`);
        }
      } else {
        AppState.allData.unshift(newBranch);
        reports[idx].status = actionType === 'add_duplicate' ? 'Approved (Duplicate Added)' : 'Approved';
        showToast(`✅ Branch "${r.branch}" added to directory!`);
      }

      AppState.filteredData = [...AppState.allData];
      AppState.dataTable.clear().rows.add(AppState.allData).draw();
      populateSearchDropdowns();
      updateDashboardStats();

      localStorage.setItem('bank_user_reports', JSON.stringify(reports));
      syncBranchToFirebase(newBranch);
      syncReportToFirebase(reports[idx]);
      AdminManager.loadReports();
    },
    rejectReport: function (id) {
      const isSuperAdmin = AppState.isAdminLoggedIn || (AppState.currentUser && AppState.currentUser.role === 'Super Admin');
      if (!isSuperAdmin) {
        showToast('🔒 Access Denied: Only Super Admin (vikir0200@gmail.com) can reject submissions!', true);
        AdminManager.openLoginModal();
        return;
      }
      if (!confirm('⚠️ Super Admin [vikir0200@gmail.com]: Are you sure you want to reject this submission?')) return;
      const reports = JSON.parse(localStorage.getItem('bank_user_reports') || '[]');
      const idx = reports.findIndex(r => r.id === id);
      if (idx === -1) return;
      reports[idx].status = 'Rejected';
      localStorage.setItem('bank_user_reports', JSON.stringify(reports));
      syncReportToFirebase(reports[idx]);
      AdminManager.loadReports();
      showToast('Submission rejected by Super Admin.');
    },
    deleteReport: function (id) {
      const isSuperAdmin = AppState.isAdminLoggedIn || (AppState.currentUser && AppState.currentUser.role === 'Super Admin');
      if (!isSuperAdmin) {
        showToast('🔒 Access Denied: Only Super Admin (vikir0200@gmail.com) can delete report records!', true);
        AdminManager.openLoginModal();
        return;
      }
      if (!confirm('⚠️ Super Admin [vikir0200@gmail.com]: Permanently delete this submission record from history?')) return;
      const reports = JSON.parse(localStorage.getItem('bank_user_reports') || '[]');
      const updated = reports.filter(r => r.id !== id);
      localStorage.setItem('bank_user_reports', JSON.stringify(updated));
      deleteReportFromFirebase(id);
      AdminManager.loadReports();
      showToast('🗑️ Submission record deleted by Super Admin.');
    },
    previewDeleteBranch: function (ifscStr) {
      const box = document.getElementById('adminDeletePreviewBox');
      if (!box) return;
      const cleanIfsc = (ifscStr || '').trim().toUpperCase();
      if (cleanIfsc.length < 4) {
        box.style.display = 'none';
        return;
      }
      const match = AppState.allData.find(b => (b.ifsc || '').trim().toUpperCase() === cleanIfsc);
      box.style.display = 'block';
      if (match) {
        box.innerHTML = `<span class="text-success fw-semibold"><i class="fa-solid fa-circle-check me-1"></i>Found:</span> <strong>${sanitizeHtml(match.bank)}</strong> - ${sanitizeHtml(match.branch)} (${sanitizeHtml(match.district)})<br><small class="text-muted">${sanitizeHtml(match.address)}</small>`;
      } else {
        box.innerHTML = `<span class="text-danger fw-semibold"><i class="fa-solid fa-circle-xmark me-1"></i>No matching branch:</span> IFSC <code>${sanitizeHtml(cleanIfsc)}</code> is not in directory.`;
      }
    },
    deleteBranchByInput: function () {
      const input = document.getElementById('adminDeleteIfscInput');
      if (!input) return;
      const cleanIfsc = input.value.trim().toUpperCase();
      if (!cleanIfsc) {
        showToast('Please enter an IFSC code to delete', true);
        return;
      }
      AdminManager.deleteBranch(cleanIfsc);
      input.value = '';
      const box = document.getElementById('adminDeletePreviewBox');
      if (box) box.style.display = 'none';
    },
    downloadTemplate: function (type) {
      const columns = ['bank', 'branch', 'ifsc', 'micr', 'district', 'state', 'address', 'pincode', 'phone', 'email'];

      if (type === 'csv') {
        const sampleRows = [
          columns.join(','),
          '"State Bank of India","Coimbatore Main","SBIN0001234","641002001","Coimbatore","Tamil Nadu","1 Gandhi Road Coimbatore 641001","641001","0422-2300001","coimbatore@sbi.co.in"',
          '"HDFC Bank","Anna Nagar Branch","HDFC0002345","600002001","Chennai","Tamil Nadu","15 2nd Avenue Anna Nagar Chennai 600040","600040","044-23400002","annanagar@hdfcbank.com"',
          '"Punjab National Bank","Pollachi Branch","PUNB0003456","642002001","Coimbatore","Tamil Nadu","42 Palakkad Road Pollachi 642001","642001","04259-220003","pollachi@pnb.co.in"'
        ].join('\n');

        const blob = new Blob([sampleRows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'BankDirectory_Upload_Template.csv';
        a.click();
        URL.revokeObjectURL(url);
        showToast('CSV Template downloaded! Fill in the columns and upload.');

      } else if (type === 'json') {
        const sampleData = [
          {
            bank: "State Bank of India",
            branch: "Coimbatore Main",
            ifsc: "SBIN0001234",
            micr: "641002001",
            district: "Coimbatore",
            state: "Tamil Nadu",
            address: "1 Gandhi Road, Coimbatore – 641001",
            pincode: "641001",
            phone: "0422-2300001",
            email: "coimbatore@sbi.co.in"
          },
          {
            bank: "HDFC Bank",
            branch: "Anna Nagar Branch",
            ifsc: "HDFC0002345",
            micr: "600002001",
            district: "Chennai",
            state: "Tamil Nadu",
            address: "15, 2nd Avenue, Anna Nagar, Chennai – 600040",
            pincode: "600040",
            phone: "044-23400002",
            email: "annanagar@hdfcbank.com"
          },
          {
            bank: "Punjab National Bank",
            branch: "Pollachi Branch",
            ifsc: "PUNB0003456",
            micr: "642002001",
            district: "Coimbatore",
            state: "Tamil Nadu",
            address: "42 Palakkad Road, Pollachi – 642001",
            pincode: "642001",
            phone: "04259-220003",
            email: "pollachi@pnb.co.in"
          }
        ];

        const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'BankDirectory_Upload_Template.json';
        a.click();
        URL.revokeObjectURL(url);
        showToast('JSON Template downloaded! Fill in and upload.');

      } else if (type === 'excel') {
        if (typeof XLSX === 'undefined') {
          alert('Excel library not loaded. Please check your internet connection and try again.');
          return;
        }

        const sampleData = [
          { bank: 'State Bank of India',   branch: 'Coimbatore Main',   ifsc: 'SBIN0001234', micr: '641002001', district: 'Coimbatore', state: 'Tamil Nadu', address: '1 Gandhi Road, Coimbatore – 641001',                 pincode: '641001', phone: '0422-2300001',  email: 'coimbatore@sbi.co.in' },
          { bank: 'HDFC Bank',             branch: 'Anna Nagar Branch', ifsc: 'HDFC0002345', micr: '600002001', district: 'Chennai',     state: 'Tamil Nadu', address: '15, 2nd Avenue, Anna Nagar, Chennai – 600040',     pincode: '600040', phone: '044-23400002',  email: 'annanagar@hdfcbank.com' },
          { bank: 'Punjab National Bank',  branch: 'Pollachi Branch',   ifsc: 'PUNB0003456', micr: '642002001', district: 'Coimbatore', state: 'Tamil Nadu', address: '42 Palakkad Road, Pollachi – 642001',               pincode: '642001', phone: '04259-220003', email: 'pollachi@pnb.co.in' },
          { bank: '',                      branch: '',                  ifsc: '',             micr: '',           district: '',           state: '',           address: '',                                                  pincode: '',       phone: '',              email: '' }
        ];

        const worksheet = XLSX.utils.json_to_sheet(sampleData, {
          header: ['bank','branch','ifsc','micr','district','state','address','pincode','phone','email']
        });

        // Set column widths for readability
        worksheet['!cols'] = [
          { wch: 30 }, // bank
          { wch: 28 }, // branch
          { wch: 14 }, // ifsc
          { wch: 14 }, // micr
          { wch: 18 }, // district
          { wch: 18 }, // state
          { wch: 45 }, // address
          { wch: 10 }, // pincode
          { wch: 18 }, // phone
          { wch: 30 }  // email
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Bank Branches');

        // Add an instructions sheet
        const instructions = [
          ['COLUMN',   'REQUIRED', 'DESCRIPTION',                           'EXAMPLE'],
          ['bank',     'YES',      'Full name of the bank',                  'State Bank of India'],
          ['branch',   'YES',      'Name of the branch',                     'Coimbatore Main'],
          ['ifsc',     'YES',      '11-character IFSC code',                 'SBIN0001234'],
          ['micr',     'NO',       '9-digit MICR code',                      '641002001'],
          ['district', 'YES',      'District of the branch',                 'Coimbatore'],
          ['state',    'YES',      'State of the branch',                    'Tamil Nadu'],
          ['address',  'YES',      'Full street address',                    '1 Gandhi Road, Coimbatore – 641001'],
          ['pincode',  'NO',       '6-digit PIN code',                       '641001'],
          ['phone',    'NO',       'Branch phone number',                    '0422-2300001'],
          ['email',    'NO',       'Branch email address',                   'coimbatore@sbi.co.in'],
        ];
        const instrSheet = XLSX.utils.aoa_to_sheet(instructions);
        instrSheet['!cols'] = [{ wch: 12 }, { wch: 10 }, { wch: 35 }, { wch: 35 }];
        XLSX.utils.book_append_sheet(workbook, instrSheet, 'Instructions');

        XLSX.writeFile(workbook, 'BankDirectory_Upload_Template.xlsx');
        showToast('Excel Template downloaded! Fill "Bank Branches" sheet and upload.');
      }
    },
    openAddModal: function () {
      if (!AppState.isAdminLoggedIn) {
        AdminManager.openLoginModal();
        return;
      }
      document.getElementById('branchForm').reset();
      document.getElementById('editOriginalIfsc').value = '';
      document.getElementById('branchModalTitle').textContent = 'Add New Bank Branch';
      const modal = new bootstrap.Modal(document.getElementById('branchFormModal'));
      modal.show();
    },
    openEditModal: function (ifsc) {
      if (!AppState.isAdminLoggedIn) {
        AdminManager.openLoginModal();
        return;
      }
      const branch = AppState.allData.find(i => i.ifsc === ifsc);
      if (!branch) return;

      document.getElementById('editOriginalIfsc').value = branch.ifsc;
      document.getElementById('formBank').value = branch.bank || '';
      document.getElementById('formBranch').value = branch.branch || '';
      document.getElementById('formIfsc').value = branch.ifsc || '';
      document.getElementById('formMicr').value = branch.micr || '';
      document.getElementById('formDistrict').value = branch.district || '';
      document.getElementById('formState').value = branch.state || '';
      document.getElementById('formAddress').value = branch.address || '';
      document.getElementById('formPincode').value = branch.pincode || '';
      document.getElementById('formPhone').value = branch.phone || '';
      document.getElementById('formEmail').value = branch.email || '';

      document.getElementById('branchModalTitle').textContent = 'Edit Bank Branch';
      const modal = new bootstrap.Modal(document.getElementById('branchFormModal'));
      modal.show();
    },
    saveBranch: function () {
      if (!AppState.isAdminLoggedIn) {
        AdminManager.openLoginModal();
        return;
      }
      const origIfsc = document.getElementById('editOriginalIfsc').value;
      const newBranch = {
        bank: document.getElementById('formBank').value.trim(),
        branch: document.getElementById('formBranch').value.trim(),
        ifsc: document.getElementById('formIfsc').value.trim().toUpperCase(),
        micr: document.getElementById('formMicr').value.trim(),
        district: document.getElementById('formDistrict').value.trim(),
        state: document.getElementById('formState').value.trim(),
        address: document.getElementById('formAddress').value.trim(),
        pincode: document.getElementById('formPincode').value.trim(),
        phone: document.getElementById('formPhone').value.trim(),
        email: document.getElementById('formEmail').value.trim()
      };

      if (!newBranch.bank || !newBranch.branch || !newBranch.ifsc || !newBranch.district || !newBranch.state) {
        alert('Please fill out all required fields (*)');
        return;
      }

      // If IFSC changed during edit, clean up old IFSC
      if (origIfsc && origIfsc !== newBranch.ifsc) {
        AppState.allData = AppState.allData.filter(i => i.ifsc !== origIfsc);
        deleteBranchFromFirebase(origIfsc);
        if (AppState.favorites.has(origIfsc)) {
          AppState.favorites.delete(origIfsc);
          localStorage.setItem('bank_favorites', JSON.stringify(Array.from(AppState.favorites)));
        }
      }

      // Remove from deleted tracking set if re-added
      const deletedIfscs = JSON.parse(localStorage.getItem('bank_deleted_ifscs') || '[]');
      const updatedDeleted = deletedIfscs.filter(code => code !== newBranch.ifsc && code !== origIfsc);
      localStorage.setItem('bank_deleted_ifscs', JSON.stringify(updatedDeleted));

      if (origIfsc) {
        // Edit existing
        const idx = AppState.allData.findIndex(i => i.ifsc === origIfsc || i.ifsc === newBranch.ifsc);
        if (idx !== -1) {
          AppState.allData[idx] = newBranch;
        } else {
          AppState.allData.unshift(newBranch);
        }
      } else {
        // Add new
        AppState.allData = AppState.allData.filter(i => i.ifsc !== newBranch.ifsc);
        AppState.allData.unshift(newBranch);
      }

      // Save custom additions to localStorage (de-duplicated) and sync to Firebase Cloud
      let localCustom = JSON.parse(localStorage.getItem('bank_custom_branches') || '[]');
      localCustom = localCustom.filter(b => b.ifsc !== origIfsc && b.ifsc !== newBranch.ifsc);
      localCustom.push(newBranch);
      localStorage.setItem('bank_custom_branches', JSON.stringify(localCustom));

      syncBranchToFirebase(newBranch);

      AppState.filteredData = [...AppState.allData];
      AppState.dataTable.clear().rows.add(AppState.allData).draw();
      populateSearchDropdowns();
      updateDashboardStats();

      const modalEl = document.getElementById('branchFormModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();

      showToast(origIfsc ? 'Branch details updated & cloud synced!' : 'New branch added & cloud synced!');
    },
    deleteBranch: function (ifsc) {
      const isSuperAdmin = AppState.isAdminLoggedIn || (AppState.currentUser && AppState.currentUser.role === 'Super Admin');
      if (!isSuperAdmin) {
        showToast('🔒 Access Denied: Only Super Admin (vikir0200@gmail.com) can remove bank branches!', true);
        AdminManager.openLoginModal();
        return;
      }

      const branch = AppState.allData.find(i => i.ifsc === ifsc);
      const branchName = branch ? `${branch.bank} (${branch.branch})` : ifsc;

      if (!confirm(`⚠️ Super Admin Confirmation:\nAre you sure you want to permanently remove branch "${branchName}" [IFSC: ${ifsc}] from the bank directory?`)) return;

      AppState.allData = AppState.allData.filter(i => i.ifsc !== ifsc);
      deleteBranchFromFirebase(ifsc);

      // Clean from localStorage custom branches
      let localCustom = JSON.parse(localStorage.getItem('bank_custom_branches') || '[]');
      localCustom = localCustom.filter(b => b.ifsc !== ifsc);
      localStorage.setItem('bank_custom_branches', JSON.stringify(localCustom));

      // Record in deleted IFSCs tracking set
      let deletedIfscs = JSON.parse(localStorage.getItem('bank_deleted_ifscs') || '[]');
      if (!deletedIfscs.includes(ifsc)) {
        deletedIfscs.push(ifsc);
        localStorage.setItem('bank_deleted_ifscs', JSON.stringify(deletedIfscs));
      }

      if (AppState.favorites.has(ifsc)) {
        AppState.favorites.delete(ifsc);
        localStorage.setItem('bank_favorites', JSON.stringify(Array.from(AppState.favorites)));
      }

      AppState.filteredData = AppState.filteredData.filter(i => i.ifsc !== ifsc);
      AppState.dataTable.clear().rows.add(AppState.allData).draw();
      populateSearchDropdowns();
      updateDashboardStats();
      showToast(`🗑️ Branch "${branchName}" removed from local cache & cloud database by Super Admin.`);

      const qrModalEl = document.getElementById('qrCodeModal');
      if (qrModalEl) {
        const modal = bootstrap.Modal.getInstance(qrModalEl);
        if (modal) modal.hide();
      }
    },
    importFile: function (e) {
      if (!AppState.isAdminLoggedIn) {
        AdminManager.openLoginModal();
        return;
      }
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      const ext = file.name.split('.').pop().toLowerCase();

      reader.onload = function (evt) {
        let importedRecords = [];
        try {
          if (ext === 'json') {
            importedRecords = JSON.parse(evt.target.result);
          } else {
            // CSV / XLSX via SheetJS
            const workbook = XLSX.read(evt.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            importedRecords = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          }

          if (Array.isArray(importedRecords) && importedRecords.length > 0) {
            AppState.allData = [...importedRecords, ...AppState.allData];
            AppState.filteredData = [...AppState.allData];
            importedRecords.forEach(b => syncBranchToFirebase(b));

            AppState.dataTable.clear().rows.add(AppState.allData).draw();
            populateSearchDropdowns();
            updateDashboardStats();
            showToast(`Successfully imported & cloud synced ${importedRecords.length.toLocaleString()} records!`);
          } else {
            alert('No valid records found in imported file.');
          }
        } catch (err) {
          alert('Error parsing file: ' + err.message);
        }
      };

      if (ext === 'json') {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    },
    backupDatabase: function () {
      if (!AppState.isAdminLoggedIn) {
        AdminManager.openLoginModal();
        return;
      }
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.allData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `banks_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Database backup downloaded!');
    },
    restoreDatabase: function (e) {
      if (!AppState.isAdminLoggedIn) {
        AdminManager.openLoginModal();
        return;
      }
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        try {
          const restored = JSON.parse(evt.target.result);
          if (Array.isArray(restored)) {
            AppState.allData = restored;
            AppState.filteredData = [...restored];
            AppState.dataTable.clear().rows.add(restored).draw();
            populateSearchDropdowns();
            updateDashboardStats();
            showToast('Database restored from backup!');
          }
        } catch (err) {
          alert('Invalid backup JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // --- USER AUTHENTICATION MANAGER ---
  const AuthManager = {
    togglePasswordVisibility: function (inputId, buttonEl) {
      const input = document.getElementById(inputId);
      if (!input) return;
      const icon = buttonEl ? buttonEl.querySelector('i') : null;
      if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }
      } else {
        input.type = 'password';
        if (icon) {
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      }
    },
    openAuthModal: function (tab) {
      const errEl = document.getElementById('authErrorAlert');
      if (errEl) errEl.style.display = 'none';

      // Auto fill remembered email
      const rememberedEmail = localStorage.getItem('bank_remember_email');
      const emailInput = document.getElementById('loginEmailInput');
      const rememberCheck = document.getElementById('rememberMeCheck');
      if (rememberedEmail && emailInput) {
        emailInput.value = rememberedEmail;
        if (rememberCheck) rememberCheck.checked = true;
      }

      if (tab === 'register') {
        const regTabBtn = document.getElementById('tab-register-btn');
        if (regTabBtn) bootstrap.Tab.getOrCreateInstance(regTabBtn).show();
      } else {
        const loginTabBtn = document.getElementById('tab-login-btn');
        if (loginTabBtn) bootstrap.Tab.getOrCreateInstance(loginTabBtn).show();
      }

      const modalEl = document.getElementById('authModal');
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl, { backdrop: 'static', keyboard: false });
      modal.show();
    },
    evaluatePasswordStrength: function (password) {
      const bar = document.getElementById('passwordStrengthBar');
      const text = document.getElementById('passwordStrengthText');
      if (!bar || !text) return;

      if (!password) {
        bar.style.width = '0%';
        bar.className = 'progress-bar bg-danger';
        text.textContent = 'Password Strength: None';
        text.className = 'text-muted';
        return;
      }

      let score = 0;
      if (password.length >= 6) score += 25;
      if (password.length >= 10) score += 25;
      if (/[0-9]/.test(password)) score += 25;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password) || /[A-Z]/.test(password)) score += 25;

      bar.style.width = score + '%';
      if (score <= 25) {
        bar.className = 'progress-bar bg-danger';
        text.textContent = 'Password Strength: Weak';
        text.className = 'text-danger fw-semibold';
      } else if (score <= 50) {
        bar.className = 'progress-bar bg-warning';
        text.textContent = 'Password Strength: Moderate';
        text.className = 'text-warning fw-semibold';
      } else if (score <= 75) {
        bar.className = 'progress-bar bg-info';
        text.textContent = 'Password Strength: Good';
        text.className = 'text-info fw-semibold';
      } else {
        bar.className = 'progress-bar bg-success';
        text.textContent = 'Password Strength: Strong';
        text.className = 'text-success fw-semibold';
      }
    },
    openForgotPasswordModal: function (e) {
      if (e) e.preventDefault();
      const authModalEl = document.getElementById('authModal');
      if (authModalEl) {
        const authModal = bootstrap.Modal.getInstance(authModalEl);
        if (authModal) authModal.hide();
      }

      const errEl = document.getElementById('forgotPasswordErrorAlert');
      const succEl = document.getElementById('forgotPasswordSuccessAlert');
      if (errEl) errEl.style.display = 'none';
      if (succEl) succEl.style.display = 'none';

      const resetForm = document.getElementById('forgotPasswordForm');
      if (resetForm) resetForm.reset();

      const currentLoginEmail = document.getElementById('loginEmailInput').value;
      if (currentLoginEmail) {
        document.getElementById('resetEmailInput').value = currentLoginEmail;
      }

      const resetModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('forgotPasswordModal'));
      resetModal.show();
    },
    sendFirebasePasswordResetEmail: function (email) {
      const errEl = document.getElementById('forgotPasswordErrorAlert');
      const succEl = document.getElementById('forgotPasswordSuccessAlert');
      if (errEl) errEl.style.display = 'none';
      if (succEl) succEl.style.display = 'none';

      const cleanEmail = (email || '').trim().toLowerCase();
      if (!cleanEmail) {
        if (errEl) {
          errEl.textContent = 'Please enter your registered email address above.';
          errEl.style.display = 'block';
        }
        return;
      }

      showToast(`Sending password reset link to Gmail (${cleanEmail})...`);

      const resetUrl = `${window.location.origin}${window.location.pathname}?reset_email=${encodeURIComponent(cleanEmail)}`;

      // 1. Firebase Auth reset attempt
      if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().sendPasswordResetEmail(cleanEmail).catch(err => console.warn('Firebase Auth:', err));
      }

      // 2. Real email dispatch to recipient's Gmail inbox via FormSubmit API
      fetch('https://formsubmit.co/ajax/' + encodeURIComponent(cleanEmail), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: '🔒 Bank Directory System - Reset Your Password',
          email: cleanEmail,
          message: `Hello,\n\nYou requested a password reset for your Bank Directory account (${cleanEmail}).\n\nPlease click the secure link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`
        })
      }).catch(err => console.warn('Email dispatch warning:', err));

      // 3. Render clean success notification without cluttering on-screen code boxes
      if (succEl) {
        succEl.innerHTML = `
          <div class="py-1">
            <div class="fw-bold text-success mb-1"><i class="fa-solid fa-paper-plane me-1"></i> Reset Link Sent to Gmail!</div>
            <p class="small text-muted mb-0">A password reset link has been dispatched to <strong>${sanitizeHtml(cleanEmail)}</strong>. Please check your <strong>Gmail Inbox or Spam folder</strong> to reset your password.</p>
          </div>
        `;
        succEl.style.display = 'block';
      }
      showToast(`Reset email sent to ${cleanEmail}! Check Gmail.`);
    },
    openInstantResetDialog: function (email) {
      const cleanEmail = (email || '').trim().toLowerCase();
      const newPassword = prompt(`🔑 Reset Password for ${cleanEmail}:\n\nPlease enter your NEW password (minimum 6 characters):`);
      if (!newPassword) return;
      if (newPassword.trim().length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }
      const cleanNewPass = newPassword.trim();
      const users = JSON.parse(localStorage.getItem('bank_users') || '[]');
      const idx = users.findIndex(u => (u.email || '').toLowerCase() === cleanEmail);
      if (idx !== -1) {
        users[idx].password = cleanNewPass;
        localStorage.setItem('bank_users', JSON.stringify(users));
      } else {
        users.push({
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          phone: '9876543210',
          password: cleanNewPass,
          role: cleanEmail === 'vikir0200@gmail.com' ? 'Super Admin' : 'Verified Member',
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('bank_users', JSON.stringify(users));
      }

      if (firebaseDb) {
        const safeKey = cleanEmail.replace(/[\.#\$\[\]]/g, '_');
        firebaseDb.ref('users/' + safeKey).update({ passwordUpdated: new Date().toISOString() });
      }

      const modalEl = document.getElementById('forgotPasswordModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }

      AuthManager.openAuthModal('login');
      document.getElementById('loginEmailInput').value = cleanEmail;
      document.getElementById('loginPasswordInput').value = cleanNewPass;
      showToast(`✅ Password updated for ${cleanEmail}! Please click Sign In.`);
    },
    resetPassword: function (email, newPassword, confirmPassword) {
      const errEl = document.getElementById('forgotPasswordErrorAlert');
      const succEl = document.getElementById('forgotPasswordSuccessAlert');
      if (errEl) errEl.style.display = 'none';
      if (succEl) succEl.style.display = 'none';

      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanNewPass = (newPassword || '').trim();
      const cleanConfPass = (confirmPassword || '').trim();

      if (!cleanEmail || !cleanNewPass || !cleanConfPass) {
        if (errEl) {
          errEl.textContent = 'Please complete all password reset fields.';
          errEl.style.display = 'block';
        }
        return;
      }

      if (cleanNewPass.length < 6) {
        if (errEl) {
          errEl.textContent = 'New password must be at least 6 characters long.';
          errEl.style.display = 'block';
        }
        return;
      }

      if (cleanNewPass !== cleanConfPass) {
        if (errEl) {
          errEl.textContent = 'Passwords do not match! Please verify both password entries.';
          errEl.style.display = 'block';
        }
        return;
      }

      const users = JSON.parse(localStorage.getItem('bank_users') || '[]');
      const userIndex = users.findIndex(u => (u.email || '').toLowerCase() === cleanEmail);

      if (userIndex === -1 && cleanEmail !== 'vikir0200@gmail.com') {
        if (errEl) {
          errEl.textContent = 'No account found with this email address. Please check your email or register.';
          errEl.style.display = 'block';
        }
        return;
      }

      if (userIndex !== -1) {
        users[userIndex].password = cleanNewPass;
        localStorage.setItem('bank_users', JSON.stringify(users));

        if (firebaseDb) {
          const safeKey = cleanEmail.replace(/[\.#\$\[\]]/g, '_');
          firebaseDb.ref('users/' + safeKey).update({ passwordUpdated: new Date().toISOString() });
        }
      }

      if (succEl) {
        succEl.textContent = 'Password reset successfully! Redirecting to sign in...';
        succEl.style.display = 'block';
      }

      setTimeout(() => {
        const resetModalEl = document.getElementById('forgotPasswordModal');
        if (resetModalEl) {
          const resetModal = bootstrap.Modal.getInstance(resetModalEl);
          if (resetModal) resetModal.hide();
        }
        AuthManager.openAuthModal('login');
        document.getElementById('loginEmailInput').value = cleanEmail;
        document.getElementById('loginPasswordInput').value = cleanNewPass;
        showToast('Password updated successfully! You can now Sign In.');
      }, 1400);
    },
    loginUser: function (email, password) {
      const errEl = document.getElementById('authErrorAlert');
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();

      // Remember me handling
      const rememberCheck = document.getElementById('rememberMeCheck');
      if (rememberCheck && rememberCheck.checked) {
        localStorage.setItem('bank_remember_email', cleanEmail);
      } else {
        localStorage.removeItem('bank_remember_email');
      }

      // Check Super Admin Credentials
      if (cleanEmail === 'vikir0200@gmail.com' && cleanPassword === 'VIKI1101') {
        const superAdminUser = {
          name: 'VIGNESH R (Super Admin)',
          email: 'vikir0200@gmail.com',
          phone: '9360039283',
          role: 'Super Admin'
        };
        AppState.currentUser = superAdminUser;
        AppState.isAdminLoggedIn = true;
        sessionStorage.setItem('bank_super_admin_session', 'true');
        localStorage.setItem('bank_current_user', JSON.stringify(superAdminUser));

        const modalEl = document.getElementById('authModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }

        document.body.classList.remove('app-locked');
        AuthManager.updateAuthUI();
        AdminManager.updateAdminUI();
        showToast('Signed in as Super Admin (VIGNESH R)');
        return;
      }

      // Check Local Registered Users
      const users = JSON.parse(localStorage.getItem('bank_users') || '[]');
      const foundUser = users.find(u => (u.email || '').toLowerCase() === cleanEmail && u.password === cleanPassword);

      if (foundUser) {
        AppState.currentUser = foundUser;
        localStorage.setItem('bank_current_user', JSON.stringify(foundUser));

        const modalEl = document.getElementById('authModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }

        document.body.classList.remove('app-locked');
        AuthManager.updateAuthUI();
        showToast(`Welcome back, ${foundUser.name}!`);
      } else {
        if (errEl) {
          errEl.textContent = 'Invalid Email or Password! Please check your credentials or create an account.';
          errEl.style.display = 'block';
        }
      }
    },
    registerUser: function (name, email, phone, password, confirmPassword) {
      const errEl = document.getElementById('authErrorAlert');
      const cleanName = (name || '').trim();
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPhone = (phone || '').trim();
      const cleanPassword = (password || '').trim();
      const cleanConfirmPassword = (confirmPassword || '').trim();

      if (!cleanName || !cleanEmail || !cleanPhone || !cleanPassword || !cleanConfirmPassword) {
        if (errEl) {
          errEl.textContent = 'Please fill out all registration fields.';
          errEl.style.display = 'block';
        }
        return;
      }

      if (cleanPassword !== cleanConfirmPassword) {
        if (errEl) {
          errEl.textContent = 'Passwords do not match! Please check your password fields.';
          errEl.style.display = 'block';
        }
        return;
      }

      if (cleanPassword.length < 6) {
        if (errEl) {
          errEl.textContent = 'Password must be at least 6 characters long.';
          errEl.style.display = 'block';
        }
        return;
      }

      const users = JSON.parse(localStorage.getItem('bank_users') || '[]');
      const exists = users.some(u => (u.email || '').toLowerCase() === cleanEmail);

      if (exists) {
        if (errEl) {
          errEl.textContent = 'An account with this email address already exists. Please Sign In.';
          errEl.style.display = 'block';
        }
        return;
      }

      const newUser = {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        password: cleanPassword,
        role: 'Verified Member',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('bank_users', JSON.stringify(users));

      // Push user registration to Firebase if connected
      if (firebaseDb) {
        const safeKey = cleanEmail.replace(/[\.#\$\[\]]/g, '_');
        firebaseDb.ref('users/' + safeKey).set({ name: cleanName, email: cleanEmail, phone: cleanPhone, role: 'Verified Member' });
      }

      // Auto login user
      AppState.currentUser = newUser;
      localStorage.setItem('bank_current_user', JSON.stringify(newUser));

      const modalEl = document.getElementById('authModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }

      document.body.classList.remove('app-locked');
      AuthManager.updateAuthUI();
      showToast(`Account created successfully! Welcome, ${cleanName}!`);
    },
    loginGuestUser: function () {
      const guestUser = {
        name: 'Online Guest User',
        email: 'onlineguest@bankdirectory.com',
        phone: '9360039283',
        role: 'Verified Member',
        createdAt: new Date().toISOString()
      };
      AppState.currentUser = guestUser;
      localStorage.setItem('bank_current_user', JSON.stringify(guestUser));

      const modalEl = document.getElementById('authModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }

      document.body.classList.remove('app-locked');
      AuthManager.updateAuthUI();
      showToast('Welcome! Instant Online Access Granted.');
    },
    logoutUser: function () {
      AppState.currentUser = null;
      AppState.isAdminLoggedIn = false;
      localStorage.removeItem('bank_current_user');
      sessionStorage.removeItem('bank_super_admin_session');
      document.body.classList.add('app-locked');
      AuthManager.updateAuthUI();
      AdminManager.updateAdminUI();
      showToast('Logged out successfully');
      setTimeout(() => AuthManager.openAuthModal('login'), 200);
    },
    updateAuthUI: function () {
      const container = document.getElementById('topbarUserAuthContainer');
      if (!container) return;

      if (AppState.currentUser) {
        const roleBadgeClass = AppState.currentUser.role === 'Super Admin' ? 'bg-danger' : 'bg-success';
        container.innerHTML = `
          <div class="dropdown">
            <button class="btn btn-light border rounded-pill d-flex align-items-center gap-2 px-3 py-1 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-circle-user text-primary fs-5"></i>
              <div class="text-start d-none d-sm-block" style="line-height:1.2;">
                <div class="fw-bold small text-truncate" style="max-width:130px;">${sanitizeHtml(AppState.currentUser.name)}</div>
                <small class="text-muted" style="font-size:0.7rem;">${sanitizeHtml(AppState.currentUser.role)}</small>
              </div>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 p-2" style="border-radius:12px; min-width:220px;">
              <li class="p-2 border-bottom mb-2">
                <div class="fw-bold text-dark">${sanitizeHtml(AppState.currentUser.name)}</div>
                <small class="text-muted text-break">${sanitizeHtml(AppState.currentUser.email)}</small>
                <div class="mt-1"><span class="badge ${roleBadgeClass}">${sanitizeHtml(AppState.currentUser.role)}</span></div>
              </li>
              <li>
                <button class="dropdown-item rounded-2 text-danger fw-medium" onclick="App.AuthManager.logoutUser()">
                  <i class="fa-solid fa-right-from-bracket me-2"></i> Sign Out
                </button>
              </li>
            </ul>
          </div>
        `;
      } else {
        container.innerHTML = `
          <button class="btn btn-primary rounded-pill px-3 py-1 btn-sm fw-semibold" onclick="App.AuthManager.openAuthModal('login')">
            <i class="fa-solid fa-right-to-bracket me-1"></i> Sign In
          </button>
        `;
      }
    }
  };

  // Attach to window namespace
  window.App.ExportManager = ExportManager;
  window.App.AdminManager = AdminManager;
  window.App.AuthManager = AuthManager;

  // --- 100,000 RECORD BENCHMARK GENERATOR ---
  function generateBenchmarkData(count) {
    showToast(`Generating ${count.toLocaleString()} benchmark records... Please wait`);
    setTimeout(() => {
      const banks = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Canara Bank", "Bank of Baroda", "Union Bank of India", "Kotak Mahindra Bank", "Yes Bank"];
      const states = ["Tamil Nadu", "Maharashtra", "Karnataka", "Telangana", "Delhi", "Kerala", "West Bengal", "Gujarat", "Rajasthan", "Uttar Pradesh"];
      const districts = ["Coimbatore", "Chennai", "Mumbai City", "Pune", "Bengaluru Urban", "Hyderabad", "Central Delhi", "Ernakulam", "Kolkata", "Ahmedabad"];

      const generated = [];
      for (let i = 1; i <= count; i++) {
        const b = banks[i % banks.length];
        const s = states[i % states.length];
        const d = districts[i % districts.length];
        const ifscPrefix = b.slice(0, 4).toUpperCase();
        const numPad = String(i).padStart(6, '0');

        generated.push({
          bank: b,
          branch: `Benchmark Branch #${i}`,
          ifsc: `${ifscPrefix}0${numPad.slice(-6)}`,
          micr: `600024${String(i % 999).padStart(3, '0')}`,
          district: d,
          state: s,
          address: `${i} Commercial Plaza, Sector ${i % 50}, ${d}`,
          pincode: `600${String(i % 99).padStart(3, '0')}`,
          phone: `044-28${String(i % 99999).padStart(5, '0')}`,
          email: `branch${i}@bank.com`
        });
      }

      AppState.allData = [...generated, ...AppState.allData];
      AppState.filteredData = [...AppState.allData];
      AppState.dataTable.clear().rows.add(AppState.allData).draw();
      populateSearchDropdowns();
      updateDashboardStats();
      showToast(`Added ${count.toLocaleString()} benchmark branches! Total dataset: ${AppState.allData.length.toLocaleString()}`);
    }, 100);
  }

  function resetToSeedData() {
    AppState.allData = [...SEED_BANKS];
    AppState.filteredData = [...AppState.allData];
    localStorage.removeItem('bank_custom_branches');
    AppState.dataTable.clear().rows.add(AppState.allData).draw();
    populateSearchDropdowns();
    updateDashboardStats();
    showToast('Reset dataset to original seed records');
  }

  // --- USER MISSING BRANCH REPORT ---
  function submitMissingBranch() {
    const bank    = (document.getElementById('rptBank').value || '').trim();
    const branch  = (document.getElementById('rptBranch').value || '').trim();
    const ifsc    = (document.getElementById('rptIfsc').value || '').trim().toUpperCase();
    const district= (document.getElementById('rptDistrict').value || '').trim();
    const state   = (document.getElementById('rptState').value || '').trim();
    const address = (document.getElementById('rptAddress').value || '').trim();

    if (!bank || !branch || !ifsc || !district || !state || !address) {
      showToast('Please fill all required fields marked with *', true);
      return;
    }

    if (!/^[A-Z]{4}[0-9]{7}$/.test(ifsc)) {
      showToast('IFSC Code must be 11 characters: 4 letters + 7 digits (e.g. SBIN0001234)', true);
      return;
    }

    // Check if duplicate exists in database
    const existingMatch = AppState.allData.find(b =>
      (b.ifsc || '').trim().toUpperCase() === ifsc ||
      ((b.bank || '').trim().toLowerCase() === bank.toLowerCase() &&
       (b.branch || '').trim().toLowerCase() === branch.toLowerCase() &&
       (b.district || '').trim().toLowerCase() === district.toLowerCase())
    );

    const report = {
      id: Date.now(),
      submittedAt: new Date().toLocaleString('en-IN'),
      submittedBy: AppState.currentUser ? AppState.currentUser.name : 'Guest',
      bank,
      branch,
      ifsc,
      micr: (document.getElementById('rptMicr').value || '').trim(),
      district,
      state,
      address,
      pincode: (document.getElementById('rptPincode').value || '').trim(),
      phone: (document.getElementById('rptPhone').value || '').trim(),
      email: (document.getElementById('rptEmail').value || '').trim(),
      notes: (document.getElementById('rptNotes').value || '').trim(),
      status: 'Pending',
      isDuplicate: !!existingMatch
    };

    // Save to localStorage and Firebase Realtime Database
    const existing = JSON.parse(localStorage.getItem('bank_user_reports') || '[]');
    existing.unshift(report);
    localStorage.setItem('bank_user_reports', JSON.stringify(existing));
    syncReportToFirebase(report);

    // Show success
    const successEl = document.getElementById('reportSuccessAlert');
    if (successEl) {
      if (existingMatch) {
        successEl.className = 'alert alert-warning d-flex align-items-center gap-2 mb-3';
        successEl.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation fs-5 text-warning"></i>
          <div>
            <strong>Duplicate Branch Detected!</strong><br>
            <small>A branch matching IFSC <code>${ifsc}</code> already exists. Your report was submitted to Super Admin for update/verification.</small>
          </div>`;
      } else {
        successEl.className = 'alert alert-success d-flex align-items-center gap-2 mb-3';
        successEl.innerHTML = `
          <i class="fa-solid fa-circle-check fs-5"></i>
          <div>
            <strong>Submitted Successfully!</strong><br>
            <small>Thank you! Your branch report has been saved for review.</small>
          </div>`;
      }
      successEl.style.display = 'flex';
      setTimeout(() => { successEl.style.display = 'none'; }, 6000);
    }

    clearReportForm();
    renderMySubmissions();
    if (existingMatch) {
      showToast('Notice: Submitted branch already exists in database! Flagged for Admin review.');
    } else {
      showToast('Missing branch submitted successfully! Pending review.');
    }
  }

  function clearReportForm() {
    ['rptBank','rptBranch','rptIfsc','rptMicr','rptDistrict','rptState',
     'rptAddress','rptPincode','rptPhone','rptEmail','rptNotes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }

  function renderMySubmissions() {
    const list = document.getElementById('mySubmissionsList');
    if (!list) return;
    const reports = JSON.parse(localStorage.getItem('bank_user_reports') || '[]');
    if (reports.length === 0) {
      list.innerHTML = '<small class="text-muted">No submissions yet. Fill the form to submit a missing branch.</small>';
      return;
    }
    list.innerHTML = reports.slice(0, 5).map(r => `
      <div class="border rounded-3 p-2 mb-2">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <strong class="small">${sanitizeHtml(r.bank)}</strong>
            <span class="text-muted small"> — ${sanitizeHtml(r.branch)}</span>
          </div>
          <span class="badge rounded-pill ${r.status === 'Approved' ? 'bg-success' : r.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'} ms-2" style="font-size:0.7rem;">${r.status}</span>
        </div>
        <div class="text-muted" style="font-size:0.75rem;">
          <i class="fa-solid fa-tag me-1"></i>${sanitizeHtml(r.ifsc)}
          &nbsp;·&nbsp;
          <i class="fa-regular fa-clock me-1"></i>${r.submittedAt}
        </div>
      </div>
    `).join('') + (reports.length > 5 ? `<small class="text-muted">+ ${reports.length - 5} more submission(s)</small>` : '');
  }

  // --- MODAL & QR CODE GENERATOR ---
  function openQrModal(ifsc) {
    const item = AppState.allData.find(i => i.ifsc === ifsc);
    if (!item) return;

    document.getElementById('qrModalTitle').textContent = `${item.bank} - ${item.branch}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.bank + ' ' + item.branch + ' ' + item.address)}`;
    document.getElementById('qrGoogleMapsBtn').href = googleMapsUrl;

    const body = document.getElementById('qrModalBody');
    const qrDataText = `IFSC: ${item.ifsc}\nBank: ${item.bank}\nBranch: ${item.branch}\nAddress: ${item.address}\nMICR: ${item.micr || 'N/A'}`;

    // Inline SVG QR Generator Fallback
    body.innerHTML = `
      <div class="qr-code-box mb-3">
        <svg id="qrSvg" width="160" height="160" viewBox="0 0 100 100" style="background:#fff;">
          <rect width="100" height="100" fill="#ffffff"/>
          <path d="M10 10h30v30h-30zM15 15h20v20h-20zM20 20h10v10h-10z" fill="#000"/>
          <path d="M60 10h30v30h-30zM65 15h20v20h-20zM70 20h10v10h-10z" fill="#000"/>
          <path d="M10 60h30v30h-30zM15 65h20v20h-20zM20 70h10v10h-10z" fill="#000"/>
          <rect x="50" y="50" width="10" height="10" fill="#000"/>
          <rect x="70" y="50" width="10" height="10" fill="#000"/>
          <rect x="50" y="70" width="10" height="10" fill="#000"/>
          <rect x="60" y="60" width="20" height="20" fill="#000"/>
        </svg>
      </div>
      <h6 class="fw-bold text-primary mb-1">${sanitizeHtml(item.bank)}</h6>
      <div class="mb-2"><span class="badge-ifsc fs-6">${sanitizeHtml(item.ifsc)}</span></div>
      <p class="text-muted small mb-2"><i class="fa-solid fa-location-dot me-1"></i>${sanitizeHtml(item.address)}</p>
      <div class="d-flex justify-content-center flex-wrap gap-2">
        <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="App.copyToClipboard('${escapeJs(item.ifsc)}', 'IFSC Copied!')">
          <i class="fa-regular fa-copy me-1"></i> Copy IFSC
        </button>
        <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="App.copyToClipboard('${escapeJs(item.address)}', 'Address Copied!')">
          <i class="fa-solid fa-location-dot me-1"></i> Copy Address
        </button>
        ${(AppState.isAdminLoggedIn || (AppState.currentUser && AppState.currentUser.role === 'Super Admin')) ? `
        <button class="btn btn-sm btn-outline-danger rounded-pill" onclick="App.AdminManager.deleteBranch('${escapeJs(item.ifsc)}')">
          <i class="fa-solid fa-trash-can me-1"></i> Remove Branch
        </button>` : ''}
      </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('qrCodeModal'));
    modal.show();
  }

  // --- EVENT LISTENERS & ROUTING ---
  function initEventListeners() {
    // Sidebar View Navigation
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const view = this.getAttribute('data-view');
        switchView(view);
      });
    });

    // Sidebar Toggle Navigation (Desktop Collapse & Mobile Drawer)
    const btnSidebarToggle = document.getElementById('btnSidebarToggle');
    const sidebar = document.getElementById('sidebar');
    let backdrop = document.getElementById('sidebarBackdrop');

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sidebarBackdrop';
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    if (btnSidebarToggle && sidebar) {
      btnSidebarToggle.addEventListener('click', function () {
        if (window.innerWidth < 992) {
          sidebar.classList.toggle('mobile-open');
          backdrop.classList.toggle('show', sidebar.classList.contains('mobile-open'));
        } else {
          sidebar.classList.toggle('collapsed');
        }
      });

      backdrop.addEventListener('click', function () {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('show');
      });
    }

    // Theme Toggle
    document.getElementById('btnThemeToggle').addEventListener('click', toggleTheme);
    document.getElementById('setThemeDark').addEventListener('change', function () {
      if ((this.checked && AppState.theme !== 'dark') || (!this.checked && AppState.theme === 'dark')) {
        toggleTheme();
      }
    });

    // Global Search Input
    document.getElementById('globalSearchInput').addEventListener('input', function () {
      const val = this.value.trim();
      switchView('search');
      if (AppState.dataTable) {
        AppState.dataTable.search(val).draw();
        updateTableResultCount();
      }
    });

    // Search Panel Buttons
    document.getElementById('searchForm').addEventListener('submit', function (e) {
      e.preventDefault();
      applySearchFilters();
    });
    document.getElementById('btnResetFilters').addEventListener('click', resetSearchFilters);
    document.getElementById('btnSaveBranch').addEventListener('click', function () {
      AdminManager.saveBranch();
    });

    // Favorites Clear All
    document.getElementById('btnClearFavorites').addEventListener('click', function () {
      AppState.favorites.clear();
      localStorage.removeItem('bank_favorites');
      renderFavorites();
      AppState.dataTable.draw(false);
      showToast('Cleared saved favorites');
    });

    // Settings Switches
    document.getElementById('setCompactView').addEventListener('change', function () {
      AppState.compactView = this.checked;
      localStorage.setItem('bank_compact', AppState.compactView);
      document.body.classList.toggle('compact-view', AppState.compactView);
      showToast('Compact view updated');
    });

    document.getElementById('setLargeFont').addEventListener('change', function () {
      AppState.largeFont = this.checked;
      localStorage.setItem('bank_large_font', AppState.largeFont);
      document.body.classList.toggle('font-large', AppState.largeFont);
      showToast('Font scaling updated');
    });

    // Language Selector Event
    document.getElementById('langSelect').addEventListener('change', function () {
      applyLanguage(this.value);
    });
    document.getElementById('setLanguageSelect').addEventListener('change', function () {
      applyLanguage(this.value);
    });

    // Keyboard Shortcuts Listener
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById('globalSearchInput').focus();
      } else if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
      } else if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        switchView('search');
      } else if (e.altKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        switchView('favorites');
      }
    });

    // User Login Form Event
    const userLoginForm = document.getElementById('userLoginForm');
    if (userLoginForm) {
      userLoginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmailInput').value;
        const password = document.getElementById('loginPasswordInput').value;
        AuthManager.loginUser(email, password);
      });
    }

    // Password Strength Realtime Listener
    const regPasswordInput = document.getElementById('regPasswordInput');
    if (regPasswordInput) {
      regPasswordInput.addEventListener('input', function () {
        AuthManager.evaluatePasswordStrength(this.value);
      });
    }

    // User Registration Form Event
    const userRegForm = document.getElementById('userRegisterForm');
    if (userRegForm) {
      userRegForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('regNameInput').value;
        const email = document.getElementById('regEmailInput').value;
        const phone = document.getElementById('regPhoneInput').value;
        const password = document.getElementById('regPasswordInput').value;
        const confirmPassword = document.getElementById('regConfirmPasswordInput').value;
        AuthManager.registerUser(name, email, phone, password, confirmPassword);
      });
    }

    // Forgot Password Form Event
    const forgotForm = document.getElementById('forgotPasswordForm');
    if (forgotForm) {
      forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('resetEmailInput').value;
        const newPassword = document.getElementById('resetNewPasswordInput').value;
        const confirmPassword = document.getElementById('resetConfirmPasswordInput').value;
        AuthManager.resetPassword(email, newPassword, confirmPassword);
      });
    }

    // Super Admin Login Form Event
    const adminForm = document.getElementById('adminLoginForm');
    if (adminForm) {
      adminForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('adminEmailInput').value;
        const password = document.getElementById('adminPasswordInput').value;
        AdminManager.loginSuperAdmin(email, password);
      });
    }

    initAutoSuggest();
  }

  function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-view') === viewName);
    });

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    if (viewName === 'districts') initDistrictExplorer();
    if (viewName === 'banks') initBankExplorer();
    if (viewName === 'favorites') renderFavorites();
    if (viewName === 'report') renderMySubmissions();
    if (viewName === 'admin' || viewName === 'settings') {
      if (!AppState.isAdminLoggedIn && (!AppState.currentUser || AppState.currentUser.role !== 'Super Admin')) {
        switchView('search');
        return;
      }
      if (viewName === 'admin') AdminManager.updateAdminUI();
    }

    // Close mobile sidebar and backdrop after navigation
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.remove('mobile-open');
    const bd = document.getElementById('sidebarBackdrop');
    if (bd) bd.classList.remove('show');
  }

  function filterByBank(bankName) {
    switchView('search');
    document.getElementById('filterBank').value = bankName;
    applySearchFilters();
  }

  function runRecentSearch(queryStr) {
    switchView('search');
    document.getElementById('globalSearchInput').value = queryStr;
    AppState.dataTable.search(queryStr).draw();
    updateTableResultCount();
  }

  // --- I18N ENGINE ---
  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    AppState.language = lang;
    localStorage.setItem('bank_lang', lang);

    document.getElementById('langSelect').value = lang;
    document.getElementById('setLanguageSelect').value = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang][key]) {
        el.textContent = TRANSLATIONS[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (TRANSLATIONS[lang][key]) {
        el.placeholder = TRANSLATIONS[lang][key];
      }
    });
  }

  // --- UTILITY HELPERS ---
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i><span>${sanitizeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast(successMsg);
    }
  }

  function clearAllLocalStorage() {
    if (confirm('Are you sure you want to clear local storage cache? Saved bookmarks and custom branches will be reset.')) {
      localStorage.clear();
      location.reload();
    }
  }

  function sanitizeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeJs(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
  }

  function truncateText(str, maxLen) {
    if (!str) return '';
    return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
  }

  // Attach additional helpers to window.App
  window.App.filterByBank = filterByBank;
  window.App.runRecentSearch = runRecentSearch;
  window.App.submitMissingBranch = submitMissingBranch;
  window.App.clearReportForm = clearReportForm;
  window.App.renderMySubmissions = renderMySubmissions;
  window.App.selectDistrictFromNav = selectDistrictFromNav;
  window.App.filterDistrictNavByLetter = filterDistrictNavByLetter;

  // Handle incoming password reset link clicked from Gmail inbox
  const urlParams = new URLSearchParams(window.location.search);
  const resetEmailParam = urlParams.get('reset_email');
  if (resetEmailParam) {
    setTimeout(() => {
      AuthManager.openInstantResetDialog(resetEmailParam);
    }, 600);
  }

})();

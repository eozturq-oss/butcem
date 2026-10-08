import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Plus, 
  Receipt, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Wallet, 
  Settings, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Sun, 
  Moon, 
  Scan, 
  ChevronRight, 
  Sparkles, 
  Coffee, 
  ShoppingCart, 
  Zap, 
  Car, 
  Package, 
  BarChart2, 
  CheckCircle2, 
  Sliders, 
  Save, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

const INITIAL_EXPENSES = [
  {
    id: 'exp-1',
    merchant: 'Migros Hipermarket',
    date: '2026-10-06',
    time: '14:23',
    category: 'Market',
    total: 482.50,
    tax: 38.60,
    paymentMethod: 'Kredi Kartı (**** 4821)',
    items: [
      { name: 'Süt 1L (2x)', price: 64.00 },
      { name: 'Organik Yumurta 10lu', price: 85.50 },
      { name: 'Taze Kaşar 500g', price: 185.00 },
      { name: 'Ekmek Tam Buğday', price: 28.00 },
      { name: 'Meyve Suyu 1L', price: 120.00 }
    ],
    receiptImg: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=400',
    notes: 'Haftalık mutfak alışverişi'
  },
  {
    id: 'exp-2',
    merchant: 'Starbucks Coffee',
    date: '2026-10-07',
    time: '09:15',
    category: 'Restoran & Kafe',
    total: 165.00,
    tax: 15.00,
    paymentMethod: 'Apple Pay',
    items: [
      { name: 'Iced Caramel Macchiato (L)', price: 110.00 },
      { name: 'Kruvazan', price: 55.00 }
    ],
    receiptImg: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=400',
    notes: 'Sabah kahvesi'
  },
  {
    id: 'exp-3',
    merchant: 'Shell Petrol İstasyonu',
    date: '2026-10-04',
    time: '18:40',
    category: 'Yakıt & Ulaşım',
    total: 1250.00,
    tax: 208.33,
    paymentMethod: 'Kredi Kartı (**** 1102)',
    items: [
      { name: 'V-Power Kurşunsuz Benzin', price: 1250.00 }
    ],
    receiptImg: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=400',
    notes: 'Depo fulleme'
  },
  {
    id: 'exp-4',
    merchant: 'Trendyol Teknoloji',
    date: '2026-10-02',
    time: '21:05',
    category: 'Teknoloji',
    total: 890.00,
    tax: 148.33,
    paymentMethod: 'Banka Kartı',
    items: [
      { name: 'Bluetooth Kulaklık Kılıfı', price: 190.00 },
      { name: 'Kablosuz Şarj Standı', price: 700.00 }
    ],
    receiptImg: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=400',
    notes: 'Aksesuar siparişi'
  },
  {
    id: 'exp-5',
    merchant: 'CK Boğaziçi Elektrik',
    date: '2026-10-01',
    time: '11:00',
    category: 'Faturalar',
    total: 620.00,
    tax: 103.33,
    paymentMethod: 'Otomatik Ödeme',
    items: [
      { name: 'Eylül Ayı Elektrik Faturası', price: 620.00 }
    ],
    receiptImg: null,
    notes: 'Aylık elektrik faturası'
  }
];

const CATEGORY_COLORS = {
  'Market': '#10B981',
  'Restoran & Kafe': '#F59E0B',
  'Yakıt & Ulaşım': '#3B82F6',
  'Teknoloji': '#8B5CF6',
  'Faturalar': '#EF4444',
  'Eğlence': '#EC4899',
  'Diğer': '#6B7280'
};

const CATEGORY_ICONS = {
  'Market': ShoppingCart,
  'Restoran & Kafe': Coffee,
  'Yakıt & Ulaşım': Car,
  'Teknoloji': Package,
  'Faturalar': Zap,
  'Eğlence': Sparkles,
  'Diğer': Wallet
};

const SAMPLE_TEMPLATES = [
  {
    name: 'Migros Fişi',
    merchant: 'Migros Hipermarket',
    category: 'Market',
    total: 340.75,
    tax: 28.40,
    items: [
      { name: 'Organik Yoğurt 1kg', price: 78.00 },
      { name: 'Zeytinyağı 1L Sızma', price: 210.00 },
      { name: 'Maden Suyu 6lı', price: 52.75 }
    ],
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Lucca Restoran Fişi',
    merchant: 'Lucca Bebek',
    category: 'Restoran & Kafe',
    total: 1120.00,
    tax: 101.80,
    items: [
      { name: 'Trüflü Makarna', price: 480.00 },
      { name: 'Taze Portakal Suyu', price: 140.00 },
      { name: 'Tiramisu', price: 220.00 },
      { name: 'Servis Ücreti', price: 280.00 }
    ],
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Opet Yakıt Fişi',
    merchant: 'Opet Benzinlik',
    category: 'Yakıt & Ulaşım',
    total: 950.00,
    tax: 158.30,
    items: [
      { name: 'Motorin Ultra', price: 900.00 },
      { name: 'Cam Suyu 5L', price: 50.00 }
    ],
    img: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Teknosa Mağaza',
    merchant: 'Teknosa Mağazacılık',
    category: 'Teknoloji',
    total: 2499.00,
    tax: 416.50,
    items: [
      { name: 'Logitech MX Master 3S Fare', price: 2499.00 }
    ],
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600'
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, scanner, history, analytics, budget, settings
  
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('butcem_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('butcem_budgets');
    return saved ? JSON.parse(saved) : {
      'Market': 3000,
      'Restoran & Kafe': 2000,
      'Yakıt & Ulaşım': 2500,
      'Teknoloji': 2000,
      'Faturalar': 1500,
      'Eğlence': 1000,
      'Diğer': 1000
    };
  });

  // Scanner States
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedResult, setScannedResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [manualModalOpen, setManualModalOpen] = useState(false);

  // History Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedExpenseDetail, setSelectedExpenseDetail] = useState(null);

  useEffect(() => {
    localStorage.setItem('butcem_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('butcem_budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleStartScan = (imageSource, templateData = null) => {
    setSelectedImage(imageSource);
    setIsScanning(true);
    setScanProgress(0);
    setScannedResult(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          const extracted = templateData ? {
            merchant: templateData.merchant,
            category: templateData.category,
            total: templateData.total,
            tax: templateData.tax,
            items: templateData.items,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            paymentMethod: 'Kredi Kartı (Simüle)',
            receiptImg: imageSource
          } : {
            merchant: 'Migros Jet AI',
            category: 'Market',
            total: 215.40,
            tax: 17.20,
            items: [
              { name: 'Organik Süt 1L', price: 42.00 },
              { name: 'Taze Meyve Tabağı', price: 98.40 },
              { name: 'Atıştırmalık Paket', price: 75.00 }
            ],
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            paymentMethod: 'Temassız Ödeme',
            receiptImg: imageSource
          };
          setScannedResult(extracted);
        }, 400);
      }
    }, 120);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleStartScan(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveExpense = (data) => {
    const newExp = {
      id: `exp-${Date.now()}`,
      ...data,
      notes: data.notes || 'Bütçem Yapay Zekâ Taraması'
    };
    setExpenses([newExp, ...expenses]);
    setScannedResult(null);
    setSelectedImage(null);
    setActiveTab('history');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    if (selectedExpenseDetail?.id === id) setSelectedExpenseDetail(null);
  };

  // Calculations
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.total, 0);
  const totalBudget = Object.values(budgets).reduce((acc, curr) => acc + Number(curr), 0);

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.total;
    return acc;
  }, {});

  const pieChartData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat],
    color: CATEGORY_COLORS[cat] || '#6B7280'
  }));

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} transition-colors duration-300 flex justify-center items-center p-0 sm:p-4 font-sans select-none`}>
      
      {/* Mobile Device Viewport Mockup */}
      <div className={`w-full max-w-md h-screen sm:h-[880px] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} sm:rounded-[42px] sm:shadow-2xl sm:border-[8px] flex flex-col overflow-hidden relative transition-all`}>
        
        {/* APP HEADER */}
        {}
        <div className={`px-5 pt-4 pb-3 flex justify-between items-center ${darkMode ? 'bg-slate-900/90 border-slate-800/80' : 'bg-white/90 border-slate-100'} backdrop-blur-md z-20 border-b`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight leading-none bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Bütçem</h1>
              <span className="text-[10px] text-slate-400 font-medium">Akıllı Fiş & Harcama Takibi</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              title="Ayarlar"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MAIN BODY CONTENT AREA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-5 pb-24">
          
          {/* TAB 1: DASHBOARD */}
          {}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Grand Total Spent Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-5 text-white shadow-xl shadow-emerald-900/20">
                <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">Aylık Toplam Harcama</p>
                    <h2 className="text-3xl font-black mt-1 tracking-tight">₺{totalSpent.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Bütçem Yapay Zekâ
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/15">
                  <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm">
                    <p className="text-[11px] text-emerald-100">Planlanan Bütçe</p>
                    <p className="text-base font-bold mt-0.5">₺{totalBudget.toLocaleString('tr-TR')}</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm">
                    <p className="text-[11px] text-emerald-100">Kayıtlı Fiş Sayısı</p>
                    <p className="text-base font-bold mt-0.5">{expenses.length} Fiş</p>
                  </div>
                </div>
              </div>

              {/* Quick Scanner Action */}
              <div 
                onClick={() => setActiveTab('scanner')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between ${darkMode ? 'bg-slate-800/60 border-emerald-500/30 hover:border-emerald-500' : 'bg-emerald-50/70 border-emerald-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <Camera className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Fiş Tara & Ayrıştır</h3>
                    <p className="text-xs text-slate-400">Yapay zekâ ile anında dijitalleştirin</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-500" />
              </div>

              {/* Category Spending Summary */}
              <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'} shadow-sm`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4 text-emerald-500" /> Kategori Dağılımı
                  </h3>
                  <button onClick={() => setActiveTab('analytics')} className="text-xs text-emerald-500 font-semibold hover:underline">Detaylar</button>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(val) => `₺${val.toFixed(2)}`}
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1e293b' : '#fff', 
                          borderColor: darkMode ? '#334155' : '#e2e8f0',
                          borderRadius: '12px',
                          color: darkMode ? '#fff' : '#000',
                          fontSize: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Transactions List */}
              <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'} shadow-sm`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm">Son Harcamalar</h3>
                  <button onClick={() => setActiveTab('history')} className="text-xs text-emerald-500 font-semibold hover:underline">Tümünü Gör</button>
                </div>

                <div className="space-y-2.5">
                  {expenses.slice(0, 4).map((item) => {
                    const IconComp = CATEGORY_ICONS[item.category] || Wallet;
                    return (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedExpenseDetail(item)}
                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-colors ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                            style={{ backgroundColor: CATEGORY_COLORS[item.category] || '#6B7280' }}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs line-clamp-1">{item.merchant}</h4>
                            <p className="text-[10px] text-slate-400">{item.date} • {item.category}</p>
                          </div>
                        </div>
                        <span className="font-extrabold text-xs">₺{item.total.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CAMERA & OCR SCANNER */}
          {}
          {activeTab === 'scanner' && (
            <div className="space-y-4 animate-fadeIn">
              
              {!scannedResult ? (
                <>
                  <div className="text-center py-1">
                    <h2 className="text-xl font-bold">Fiş Taraması</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Fişinizin fotoğrafını çekin veya örnek şablon seçin</p>
                  </div>

                  {/* Camera Upload Container */}
                  <div className={`relative h-60 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${isScanning ? 'border-emerald-500 bg-emerald-950/20' : darkMode ? 'border-slate-700 bg-slate-800/30' : 'border-slate-300 bg-slate-50'}`}>
                    
                    {selectedImage ? (
                      <img src={selectedImage} alt="Fiş önizleme" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center p-6 text-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <Upload className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-bold text-xs">Fiş Görseli Yükleyin</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Kamera çekimi veya galeri</p>
                        </div>
                        <label className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer transition-transform active:scale-95 shadow-md shadow-emerald-500/20">
                          Fotoğraf Yükle
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                      </div>
                    )}

                    {/* Scanning Laser Animation */}
                    {isScanning && (
                      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-white">
                        <Scan className="w-12 h-12 text-emerald-400 animate-bounce mb-3" />
                        <p className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Yapay Zekâ Analiz Ediyor...</p>
                        <p className="text-xs text-slate-400 mt-1">Ürünler, Toplam Tutar ve KDV çıkarılıyor</p>
                        
                        <div className="w-48 h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all duration-150" style={{ width: `${scanProgress}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1">%{scanProgress}</span>
                      </div>
                    )}
                  </div>

                  {/* Preset Templates */}
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">Hızlı Test Fiş Şablonları</h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {SAMPLE_TEMPLATES.map((tmpl, index) => (
                        <div 
                          key={index}
                          onClick={() => handleStartScan(tmpl.img, tmpl)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all hover:border-emerald-500 flex flex-col justify-between ${darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-white border-slate-200'}`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Receipt className="w-4 h-4 text-emerald-500" />
                            <span className="font-bold text-xs truncate">{tmpl.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            <p className="truncate">{tmpl.merchant}</p>
                            <p className="font-bold text-emerald-400 mt-1 text-xs">₺{tmpl.total.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Manual Entry Button */}
                  <button 
                    onClick={() => setManualModalOpen(true)}
                    className={`w-full py-3 rounded-2xl border border-dashed flex items-center justify-center gap-2 font-bold text-xs transition-colors ${darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}
                  >
                    <Plus className="w-4 h-4" /> Manuel Harcama Girişi Yap
                  </button>
                </>
              ) : (
                /* OCR Result Verification Form */
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Yapay Zekâ Doğruladı
                    </span>
                    <button 
                      onClick={() => setScannedResult(null)}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      Tekrar Tara
                    </button>
                  </div>

                  <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'} space-y-3`}>
                    <div>
                      <label className="text-[11px] text-slate-400 font-medium">İşletme Adı</label>
                      <input 
                        type="text" 
                        value={scannedResult.merchant} 
                        onChange={(e) => setScannedResult({...scannedResult, merchant: e.target.value})}
                        className={`w-full mt-1 p-2.5 rounded-xl border text-xs font-semibold ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 font-medium">Kategori</label>
                        <select 
                          value={scannedResult.category}
                          onChange={(e) => setScannedResult({...scannedResult, category: e.target.value})}
                          className={`w-full mt-1 p-2.5 rounded-xl border text-xs font-semibold ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                        >
                          {Object.keys(CATEGORY_COLORS).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 font-medium">Tarih</label>
                        <input 
                          type="date" 
                          value={scannedResult.date} 
                          onChange={(e) => setScannedResult({...scannedResult, date: e.target.value})}
                          className={`w-full mt-1 p-2.5 rounded-xl border text-xs font-semibold ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>

                    {/* Extracted Line Items */}
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-[11px] text-slate-400 font-medium mb-1.5">Algılanan Ürünler</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar pr-1">
                        {scannedResult.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-500/10">
                            <span>{item.name}</span>
                            <span className="font-bold">₺{item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700/50">
                      <div>
                        <label className="text-[11px] text-slate-400 font-medium">Hesaplanan KDV</label>
                        <input 
                          type="number" 
                          value={scannedResult.tax} 
                          onChange={(e) => setScannedResult({...scannedResult, tax: parseFloat(e.target.value) || 0})}
                          className={`w-full mt-1 p-2.5 rounded-xl border text-xs font-semibold ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 font-medium">Toplam Tutar (₺)</label>
                        <input 
                          type="number" 
                          value={scannedResult.total} 
                          onChange={(e) => setScannedResult({...scannedResult, total: parseFloat(e.target.value) || 0})}
                          className={`w-full mt-1 p-2.5 rounded-xl border text-xs font-bold text-emerald-500 ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => saveExpense(scannedResult)}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/25 transition-transform active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" /> Fişi Bütçem'e Kaydet
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: EXPENSE HISTORY */}
          {}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold">Harcama Geçmişi</h2>

              {/* Search & Category Filter */}
              <div className="space-y-2">
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <Search className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Mağaza veya açıklama ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-xs w-full focus:outline-none"
                  />
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                  {['Tümü', ...Object.keys(CATEGORY_COLORS)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-emerald-500 text-white' : darkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtered Expense List */}
              <div className="space-y-2.5">
                {expenses
                  .filter(exp => selectedCategory === 'Tümü' || exp.category === selectedCategory)
                  .filter(exp => exp.merchant.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item) => {
                    const IconComp = CATEGORY_ICONS[item.category] || Wallet;
                    return (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedExpenseDetail(item)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between ${darkMode ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-100'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                            style={{ backgroundColor: CATEGORY_COLORS[item.category] || '#6B7280' }}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs">{item.merchant}</h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                              <span>{item.date}</span>
                              <span>•</span>
                              <span className="text-emerald-500 font-medium">{item.category}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-xs block">₺{item.total.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400">{item.items?.length || 1} Kalem</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 4: ANALYTICS */}
          {}
          {activeTab === 'analytics' && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold">Harcama Analizleri</h2>

              <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'} shadow-sm space-y-3`}>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Haftalık Harcama Dağılımı</h3>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { day: 'Pzt', amount: 320 },
                      { day: 'Sal', amount: 890 },
                      { day: 'Çar', amount: 165 },
                      { day: 'Per', amount: 1250 },
                      { day: 'Cum', amount: 480 },
                      { day: 'Cmt', amount: 210 },
                      { day: 'Paz', amount: 620 },
                    ]}>
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        formatter={(value) => `₺${value}`}
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1e293b' : '#fff', 
                          borderColor: darkMode ? '#334155' : '#e2e8f0',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="amount" fill="#10B981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Breakdown List */}
              <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'} shadow-sm space-y-3`}>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Kategori Bazlı Toplamlar</h3>
                <div className="space-y-3">
                  {Object.keys(CATEGORY_COLORS).map(cat => {
                    const amount = categoryTotals[cat] || 0;
                    const percentage = totalSpent ? ((amount / totalSpent) * 100).toFixed(1) : 0;
                    const IconComp = CATEGORY_ICONS[cat] || Wallet;

                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <IconComp className="w-4 h-4" style={{ color: CATEGORY_COLORS[cat] }} />
                            <span className="font-semibold">{cat}</span>
                          </div>
                          <span className="font-bold">₺{amount.toFixed(2)} ({percentage}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%`, backgroundColor: CATEGORY_COLORS[cat] }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BUDGET CONFIGURATOR */}
          {}
          {activeTab === 'budget' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold">Kategori Bütçeleri</h2>
                <p className="text-xs text-slate-400">Aylık harcama limitlerinizi kontrol edin</p>
              </div>

              <div className="space-y-3">
                {Object.keys(budgets).map(cat => {
                  const spent = categoryTotals[cat] || 0;
                  const limit = budgets[cat];
                  const percent = Math.min(Math.round((spent / limit) * 100), 100);
                  const isOver = spent > limit;

                  return (
                    <div key={cat} className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'} space-y-2`}>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">{cat}</span>
                        <div className="text-right">
                          <span className={`font-bold ${isOver ? 'text-red-500' : 'text-emerald-500'}`}>₺{spent.toFixed(0)}</span>
                          <span className="text-slate-400"> / ₺{limit}</span>
                        </div>
                      </div>

                      <div className="w-full h-2.5 bg-slate-700/20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-500' : percent > 85 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
                        <span>%{percent} Harcandı</span>
                        {isOver && <span className="text-red-400 font-bold">Limit Aşıldı!</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {}
          {activeTab === 'settings' && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold">Ayarlar & Bütçe Limiti</h2>

              <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-100'} space-y-4`}>
                <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Aylık Limitleri Düzenle</h3>
                
                {Object.keys(budgets).map(cat => (
                  <div key={cat} className="flex justify-between items-center text-xs">
                    <span className="font-medium">{cat}</span>
                    <input 
                      type="number"
                      value={budgets[cat]}
                      onChange={(e) => setBudgets({ ...budgets, [cat]: parseFloat(e.target.value) || 0 })}
                      className={`w-28 p-2 rounded-xl border text-right font-bold text-emerald-400 ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>
                ))}

                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="w-full py-3 bg-emerald-500 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <Save className="w-4 h-4" /> Bütçe Limitlerini Kaydet
                </button>
              </div>
            </div>
          )}

        </div>

        {/* MODAL: EXPENSE DETAIL */}
        {}
        {selectedExpenseDetail && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-30 flex flex-col justify-end sm:justify-center p-4 animate-fadeIn">
            <div className={`p-5 rounded-3xl border max-h-[85vh] overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} space-y-4`}>
              <div className="flex justify-between items-center border-b pb-3 border-slate-800">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-base">Bütçem Fiş Detayı</h3>
                </div>
                <button onClick={() => setSelectedExpenseDetail(null)} className="p-1 text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedExpenseDetail.receiptImg && (
                <div className="h-36 w-full rounded-2xl overflow-hidden relative">
                  <img src={selectedExpenseDetail.receiptImg} alt="Fiş" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">İşletme</span>
                  <span className="font-bold">{selectedExpenseDetail.merchant}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Tarih</span>
                  <span>{selectedExpenseDetail.date}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Kategori</span>
                  <span className="text-emerald-400 font-bold">{selectedExpenseDetail.category}</span>
                </div>
              </div>

              {selectedExpenseDetail.items && (
                <div className="bg-slate-800/30 p-3 rounded-2xl space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400">SATIN ALINAN KALEMLER</p>
                  {selectedExpenseDetail.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span>{item.name}</span>
                      <span className="font-bold">₺{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-[10px] text-slate-400">Toplam Tutar</p>
                  <p className="text-xl font-black text-emerald-400">₺{selectedExpenseDetail.total.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => handleDeleteExpense(selectedExpenseDetail.id)}
                  className="px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Sil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: MANUAL EXPENSE ADDITION */}
        {manualModalOpen && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-30 flex flex-col justify-end sm:justify-center p-4 animate-fadeIn">
            <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} space-y-4`}>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base">Manuel Harcama Ekle</h3>
                <button onClick={() => setManualModalOpen(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                saveExpense({
                  merchant: form.merchant.value,
                  category: form.category.value,
                  total: parseFloat(form.total.value),
                  tax: parseFloat(form.total.value) * 0.1,
                  date: form.date.value || new Date().toISOString().split('T')[0],
                  items: [{ name: form.merchant.value, price: parseFloat(form.total.value) }]
                });
                setManualModalOpen(false);
              }} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400">İşletme Adı</label>
                  <input required name="merchant" type="text" placeholder="ör. Kahve Dünyası" className={`w-full mt-1 p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400">Tutar (₺)</label>
                    <input required name="total" type="number" step="0.01" placeholder="150.00" className={`w-full mt-1 p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
                  </div>
                  <div>
                    <label className="text-slate-400">Kategori</label>
                    <select name="category" className={`w-full mt-1 p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                      {Object.keys(CATEGORY_COLORS).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-slate-400">Tarih</label>
                  <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className={`w-full mt-1 p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
                </div>

                <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm mt-2">
                  Bütçem'e Kaydet
                </button>
              </form>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BAR */}
        {}
        <div className={`absolute bottom-0 left-0 right-0 h-16 border-t ${darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-md flex items-center justify-around px-2 z-20`}>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${activeTab === 'dashboard' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Wallet className="w-5 h-5" />
            <span>Özet</span>
          </button>

          <button 
            onClick={() => setActiveTab('history')} 
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${activeTab === 'history' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Receipt className="w-5 h-5" />
            <span>Fişler</span>
          </button>

          {/* OCR Camera Scanner Button */}
          <button 
            onClick={() => setActiveTab('scanner')} 
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 -mt-6 transform transition-transform active:scale-90"
          >
            <Scan className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${activeTab === 'analytics' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <BarChart2 className="w-5 h-5" />
            <span>Analiz</span>
          </button>

          <button 
            onClick={() => setActiveTab('budget')} 
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${activeTab === 'budget' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <PieChartIcon className="w-5 h-5" />
            <span>Bütçe</span>
          </button>
        </div>

      </div>
    </div>
  );
}
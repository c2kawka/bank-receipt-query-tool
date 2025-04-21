import React, { useState } from 'react';
import { ArrowRight, Banknote, Key, Languages, FileText, Download, ChevronDown, ChevronUp, Check, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BankReceiptQueryTool = () => {
  const [activeTab, setActiveTab] = useState('cbe');
  const [reference, setReference] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState('zh');
  const [referencesText, setReferencesText] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [batchBankNumber, setBatchBankNumber] = useState('');
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [showBatchOptions, setShowBatchOptions] = useState(false);
  const [batchProcessMode, setBatchProcessMode] = useState<'all' | 'one-by-one'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    zh: {
      title: '银行回单查询工具',
      cbe: 'CBE银行',
      boa: 'BOA银行',
      referenceLabel: (tab) => tab === 'cbe' ? 'Reference编号' : '交易编号',
      bankNumberLabel: (tab) => tab === 'cbe' ? '银行账号后8位' : '银行账号后5位',
      referencePlaceholder: (tab) => tab === 'cbe' ? '例如: FT24072P5CRR' : '例如: FT21208GTTVB',
      bankNumberPlaceholder: (tab) => tab === 'cbe' ? '例如: 98015038' : '例如: 66666',
      submit: '立即查询',
      batchQuery: '批量查询',
      batchSubmit: '批量处理',
      processing: '处理中...',
      format: (tab) => tab === 'cbe' ? '查询格式: https://apps.cbe.com.et:100/?id=REFERENCE银行后8位' : '查询格式: https://cs.bankofabyssinia.com/slip/?trx=交易编号银行后5位',
      referencesPlaceholder: '每行输入一个reference编号',
      openAll: '批量打开',
      generatedLinks: '已生成下载链接',
      batchBankNumberLabel: (tab) => tab === 'cbe' ? '银行账号后8位' : '银行账号后5位',
      batchBankNumberPlaceholder: (tab) => tab === 'cbe' ? '输入银行账号后8位' : '输入银行账号后5位',
      batchOptions: '批量处理选项',
      openAll: '全部打开',
      openOneByOne: '逐个打开',
      confirm: '确认',
      searchPlaceholder: '搜索reference编号'
    },
    en: {
      title: 'Bank Receipt Query Tool',
      cbe: 'CBE Bank',
      boa: 'BOA Bank',
      referenceLabel: (tab) => tab === 'cbe' ? 'Reference Number' : 'Transaction ID',
      bankNumberLabel: (tab) => tab === 'cbe' ? 'Last 8 digits of account' : 'Last 5 digits of account',
      referencePlaceholder: (tab) => tab === 'cbe' ? 'e.g. FT24072P5CRR' : 'e.g. FT21208GTTVB',
      bankNumberPlaceholder: (tab) => tab === 'cbe' ? 'e.g. 98015038' : 'e.g. 66666',
      submit: 'Query Now',
      batchQuery: 'Batch Query',
      batchSubmit: 'Process Batch',
      processing: 'Processing...',
      format: (tab) => tab === 'cbe' ? 'Query format: https://apps.cbe.com.et:100/?id=REFERENCE+last8digits' : 'Query format: https://cs.bankofabyssinia.com/slip/?trx=TransactionID+last5digits',
      referencesPlaceholder: 'Enter one reference per line',
      openAll: 'Download All PDFs',
      generatedLinks: 'Generated download links',
      batchBankNumberLabel: (tab) => tab === 'cbe' ? 'Last 8 digits of account' : 'Last 5 digits of account',
      batchBankNumberPlaceholder: (tab) => tab === 'cbe' ? 'Enter last 8 digits' : 'Enter last 5 digits',
      batchOptions: 'Batch Processing Options',
      openAll: 'Open All',
      openOneByOne: 'Open One by One',
      confirm: 'Confirm',
      searchPlaceholder: 'Search reference numbers'
    },
    am: {
      title: 'የባንክ ደረሰኝ መጠይቅ መሣሪያ',
      cbe: 'CBE ባንክ',
      boa: 'BOA ባንክ',
      referenceLabel: (tab) => tab === 'cbe' ? 'ሪፈረንስ ቁጥር' : 'የግብይት መለያ',
      bankNumberLabel: (tab) => tab === 'cbe' ? 'የመለያ የመጨረሻ 8 አሃዞች' : 'የመለያ የመጨረሻ 5 አሃዞች',
      referencePlaceholder: (tab) => tab === 'cbe' ? 'ምሳሌ፡ FT24072P5CRR' : 'ምሳሌ፡ FT21208GTTVB',
      bankNumberPlaceholder: (tab) => tab === 'cbe' ? 'ምሳሌ፡ 98015038' : 'ምሳሌ፡ 66666',
      submit: 'አሁን ይጠይቁ',
      batchQuery: 'ጥምር መጠይቅ',
      batchSubmit: 'ጥምር ሂደት',
      processing: 'በሂደት ላይ...',
      format: (tab) => tab === 'cbe' ? 'የመጠይቅ ቅርጸት፡ https://apps.cbe.com.et:100/?id=REFERENCE+last8digits' : 'የመጠይቅ ቅርጸት፡ https://cs.bankofabyssinia.com/slip/?trx=TransactionID+last5digits',
      referencesPlaceholder: 'በአንድ መስመር አንድ ሪፈረንስ ያስገቡ',
      openAll: 'ሁሉንም PDF ያውርዱ',
      generatedLinks: 'የተመረቱ የማውረድ አገናኞች',
      batchBankNumberLabel: (tab) => tab === 'cbe' ? 'የመለያ የመጨረሻ 8 አሃዞች' : 'የመለያ የመጨረሻ 5 አሃዞች',
      batchBankNumberPlaceholder: (tab) => tab === 'cbe' ? 'የመጨረሻ 8 አሃዞች ያስገቡ' : 'የመጨረሻ 5 አሃዞች ያስገቡ',
      batchOptions: 'የጥምር ሂደት አማራጮች',
      openAll: 'ሁሉንም ክፈት',
      openOneByOne: 'አንድ በአንድ ክፈት',
      confirm: 'አረጋግጥ',
      searchPlaceholder: 'ሪፈረንስ ቁጥሮችን ይፈልጉ'
    }
  };

  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let redirectUrl = '';
    if (activeTab === 'cbe') {
      redirectUrl = `https://apps.cbe.com.et:100/?id=${reference}${bankNumber}`;
    } else {
      redirectUrl = `https://cs.bankofabyssinia.com/slip/?trx=${reference}${bankNumber}`;
    }
    setTimeout(() => {
      window.open(redirectUrl, '_blank');
      setIsSubmitting(false);
    }, 800);
  };

  const handleBatchSubmit = (e) => {
    e.preventDefault();
    if (!batchBankNumber) {
      alert(t.batchBankNumberLabel(activeTab) + (language === 'zh' ? '不能为空' : language === 'en' ? ' cannot be empty' : ' ባዶ ሊሆን አይችልም'));
      return;
    }
    const references = referencesText.split('\n').filter(ref => ref.trim());
    if (references.length === 0) {
      alert(language === 'zh' ? '请输入至少一个reference编号' : language === 'en' ? 'Please enter at least one reference' : 'አንድ ሪፈረንስ ቁጥር አስገባ');
      return;
    }
    setIsSubmitting(true);
    const links = references.map(ref => {
      return activeTab === 'cbe' ? `https://apps.cbe.com.et:100/?id=${ref.trim()}${batchBankNumber}` : `https://cs.bankofabyssinia.com/slip/?trx=${ref.trim()}${batchBankNumber}`;
    });
    setTimeout(() => {
      setDownloadLinks(links);
      setIsSubmitting(false);
      setShowBatchOptions(false);
    }, 1500);
  };

  const processBatchLinks = () => {
    if (batchProcessMode === 'all') {
      downloadLinks.forEach(link => {
        window.open(link, '_blank');
      });
    } else {
      let index = 0;
      const openNextLink = () => {
        if (index < downloadLinks.length) {
          window.open(downloadLinks[index], '_blank');
          index++;
          setTimeout(openNextLink, 1000); // 增加间隔时间到1秒
        }
      };
      openNextLink();
    }
    setShowBatchOptions(false);
  };

  const openAll = () => {
    downloadLinks.forEach(link => {
      window.open(link, '_blank');
    });
  };

  const filteredLinks = downloadLinks.filter(link => 
    link.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className={`${activeTab === 'cbe' ? 'bg-[#f2ad14]' : 'bg-[#f2ad14]'} p-6 text-white relative`}>
          <div className="flex items-center justify-center">
            <Banknote className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">{t.title}</h1>
          </div>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className="flex items-center space-x-2" 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/20 text-white rounded px-2 py-1 text-sm focus:outline-none"
            >
              <button className="text-sm" onClick={() => setLanguage("zh")}>中文</button>
              <button className="text-sm" onClick={() => setLanguage("en")}>English</button>
              <button className="text-sm" onClick={() => setLanguage("am")}>አማርኛ</button>

            </div>
          </div>
        </div>

        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('cbe')} 
            className={`flex-1 py-3 font-medium ${activeTab === 'cbe' ? 'text-[#f2ad14] border-b-2 border-[#f2ad14]' : 'text-gray-500'}`}
          >
            {t.cbe}
          </button>
          <button 
            onClick={() => setActiveTab('boa')} 
            className={`flex-1 py-3 font-medium ${activeTab === 'boa' ? 'text-[#f2ad14] border-b-2 border-[#f2ad14]' : 'text-gray-500'}`}
          >
            {t.boa}
          </button>
        </div>

        <div className="flex border-b">
          <button 
            onClick={() => setShowBatchForm(false)} 
            className={`flex-1 py-3 font-medium ${!showBatchForm ? 'text-[#f2ad14] border-b-2 border-[#f2ad14]' : 'text-gray-500'}`}
          >
            {t.submit}
          </button>
          <button 
            onClick={() => setShowBatchForm(true)} 
            className={`flex-1 py-3 font-medium ${showBatchForm ? 'text-[#f2ad14] border-b-2 border-[#f2ad14]' : 'text-gray-500'}`}
          >
            {t.batchQuery}
          </button>
        </div>

        {!showBatchForm ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Key className="h-4 w-4 mr-1 text-[#f2ad14]" />
                {t.referenceLabel(activeTab)}
              </label>
              <input 
                id="reference" 
                type="text" 
                value={reference} 
                onChange={(e) => setReference(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
                placeholder={t.referencePlaceholder(activeTab)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="bankNumber" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Key className="h-4 w-4 mr-1 text-[#f2ad14]" />
                {t.bankNumberLabel(activeTab)}
              </label>
              <input 
                id="bankNumber" 
                type="text" 
                value={bankNumber} 
                onChange={(e) => setBankNumber(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
                placeholder={t.bankNumberPlaceholder(activeTab)} 
                required 
              />
            </div>
            <div className="text-sm text-gray-500">
              {t.format(activeTab)}
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#f2ad14] hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.processing}
                </>
              ) : (
                <>
                  {t.submit}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleBatchSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="referencesText" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FileText className="h-4 w-4 mr-1 text-[#f2ad14]" />
                {t.referenceLabel(activeTab)}
              </label>
              <textarea 
                id="referencesText" 
                value={referencesText} 
                onChange={(e) => setReferencesText(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition min-h-[120px]" 
                placeholder={t.referencesPlaceholder} 
                required 
              />
            </div>
            <div>
              <label htmlFor="batchBankNumber" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Key className="h-4 w-4 mr-1 text-[#f2ad14]" />
                {t.batchBankNumberLabel(activeTab)}
              </label>
              <input 
                id="batchBankNumber" 
                type="text" 
                value={batchBankNumber} 
                onChange={(e) => setBatchBankNumber(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
                placeholder={t.batchBankNumberPlaceholder(activeTab)} 
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#f2ad14] hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.processing}
                </>
              ) : (
                <>
                  {t.batchSubmit}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </form>
        )}

        {downloadLinks.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#f2ad14]" />
                {t.generatedLinks}
              </h3>
              <button 
                onClick={openAll}
                className="text-sm bg-[#f2ad14] hover:bg-purple-700 text-white px-3 py-1 rounded flex items-center"
              >
                <Download className="h-4 w-4 mr-1" />
                {t.openAll}
              </button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder={t.searchPlaceholder}
                />
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700 truncate">{link}</span>
                  <button 
                    onClick={() => window.open(link, '_blank')}
                    className="text-[#f2ad14] hover:text-purple-800"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {showBatchOptions && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div 
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t.batchOptions}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="openAll"
                      name="batchProcessMode"
                      type="radio"
                      checked={batchProcessMode === 'all'}
                      onChange={() => setBatchProcessMode('all')}
                      className="h-4 w-4 text-[#f2ad14] focus:ring-purple-500 border-gray-300"
                    />
                    <label htmlFor="openAll" className="ml-3 block text-sm font-medium text-gray-700">
                      {t.openAll}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="openOneByOne"
                      name="batchProcessMode"
                      type="radio"
                      checked={batchProcessMode === 'one-by-one'}
                      onChange={() => setBatchProcessMode('one-by-one')}
                      className="h-4 w-4 text-[#f2ad14] focus:ring-purple-500 border-gray-300"
                    />
                    <label htmlFor="openOneByOne" className="ml-3 block text-sm font-medium text-gray-700">
                      {t.openOneByOne}
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowBatchOptions(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {language === 'zh' ? '取消' : language === 'en' ? 'Cancel' : 'ሰርዝ'}
                  </button>
                  <button
                    type="button"
                    onClick={processBatchLinks}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#f2ad14] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {t.confirm}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>created by <a href="https://space.coze.cn" className="text-[#f2ad14] hover:underline">coze space</a></p>
        <p className="mt-1"></p>
      </footer>
    </div>
  );
};

export default BankReceiptQueryTool;
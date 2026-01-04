import React, { useState } from 'react';
import { Upload, Check, Loader2, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { sleep } from '../utils';

interface Props {
  onScanComplete: (data: any) => void;
  onClose: () => void;
}

export const StubOCR: React.FC<Props> = ({ onScanComplete, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle');

  const handleSimulateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setStatus('uploading');
    await sleep(800);
    setStatus('processing');
    await sleep(1500);
    setStatus('success');
    
    // Simulate returned data
    await sleep(500);
    onScanComplete({
      merchant: "Starbucks Coffee",
      date: "2023-11-01",
      amount: -12.45,
      items: ["Latte Grande", "Croissant"]
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-md relative overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        
        <div className="text-center space-y-4 py-6">
          <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mx-auto text-primary-600 dark:text-primary-400">
            {status === 'idle' && <Upload size={28} />}
            {(status === 'uploading' || status === 'processing') && <Loader2 size={28} className="animate-spin" />}
            {status === 'success' && <Check size={28} />}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Scan Receipt</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {status === 'idle' && "Upload an image to auto-extract details"}
              {status === 'uploading' && "Uploading securely..."}
              {status === 'processing' && "AI is reading your receipt..."}
              {status === 'success' && "Done!"}
            </p>
          </div>

          {status === 'idle' && (
            <div className="mt-6">
              <input 
                type="file" 
                id="receipt-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleSimulateUpload}
              />
              <label htmlFor="receipt-upload">
                <div className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors w-full sm:w-auto">
                  Select Image
                </div>
              </label>
              <p className="text-xs text-slate-400 mt-4">Simulates 85% accuracy OCR extraction.</p>
            </div>
          )}
        </div>
        
        {/* Progress bar visual */}
        {(status === 'uploading' || status === 'processing') && (
          <div className="absolute bottom-0 left-0 h-1 bg-primary-500 transition-all duration-[2000ms] ease-out w-full" 
               style={{ width: status === 'processing' ? '90%' : '30%' }} />
        )}
      </Card>
    </div>
  );
};
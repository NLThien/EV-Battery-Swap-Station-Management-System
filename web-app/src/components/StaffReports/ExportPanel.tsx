import React from 'react';
import './ExportPanel.css';

interface ExportPanelProps {
  onExportAction: (format: 'pdf' | 'excel' | 'csv') => void;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ onExportAction }) => {
  return (
    <div className="export-panel">
      <h3>Xuất báo cáo</h3>
      <div className="export-buttons">
        <button 
          className="export-btn pdf"
          onClick={() => onExportAction('pdf')}
        >
          PDF
        </button>
        <button 
          className="export-btn excel"
          onClick={() => onExportAction('excel')}
        >
          Excel
        </button>
        <button 
          className="export-btn csv"
          onClick={() => onExportAction('csv')}
        >
          CSV
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;
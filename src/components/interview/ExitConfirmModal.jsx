import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertCircle } from 'lucide-react';

export const ExitConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Leave Interview?">
      <div className="text-center py-2">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Your current progress in this session will be lost. Are you sure you want to end this mock interview?
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Resume Practice
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Quit Session
          </Button>
        </div>
      </div>
    </Modal>
  );
};
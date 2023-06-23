import { toast } from 'react-toastify';

class AlertService {
    showSuccess(title, content = '') {
        toast.success(`${title}<br/>${content}`);
    }

    showError(title, content = '') {
        toast.error(`${title}<br/>${content}`);
    }
}

export const alertService = new AlertService();

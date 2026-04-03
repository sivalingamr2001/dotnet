import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/context/AuthContext';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      message.success('Login successful');
      navigate({ to: '/dashboard' });
    },
  });
};

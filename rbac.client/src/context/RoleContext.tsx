import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { useAuth } from './AuthContext';

interface RoleContextValue {
  activeRole: string | null;
  setActiveRole: (role: string) => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: PropsWithChildren) {
  const { role } = useAuth();
  const [overrideRole, setOverrideRole] = useState<string | null>(null);
  const activeRole = overrideRole ?? role;
  const value = useMemo(() => ({ activeRole, setActiveRole: setOverrideRole }), [activeRole]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within RoleProvider');
  return context;
};

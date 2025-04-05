import { DynamicWidget } from '@/lib/dynamic'

export const ConnectWallet = () => {
  return (
    <div>
     <DynamicWidget variant="modal"   innerSettings={{
    verifyEmailSettings: {
      enabled: false
    }
  }}
   />
    </div>
  );
};

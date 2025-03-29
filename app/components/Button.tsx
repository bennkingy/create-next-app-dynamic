'use client';

import Link from 'next/link';

interface ButtonProps {
  href?: string;
  type?: 'primary' | 'secondary';
  label: string;
  target?: string;
  icon?: React.ReactNode;
  className?: string;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  rel?: string;
  disabled?: boolean;
  prevent?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button: React.FC<ButtonProps> = ({
  href = '',
  type = 'primary',
  label,
  icon = null,
  className = '',
  target = '_self',
  buttonType = 'submit',
  rel,
  disabled,
  onClick,
}) => {
  const baseClasses = `flex font-sans !uppercase items-center justify-center px-3 py-3 text-sm font-bold leading-6 capitalize duration-100 transform rounded-sm focus:ring-4 focus:ring-opacity-50 focus:outline-none hover:shadow-lg hover:-translate-y-1 ${className}`;
  const primaryClasses = 'bg-brand-blue border-2 border-brand-blue text-white shadow cursor-pointer focus:ring-green-500';

  const secondaryClasses = 'border-2 border-brand-blue text-brand-blue cursor-pointer focus:ring-green-500';

  const buttonClasses = `${baseClasses} ${type === 'primary' ? primaryClasses : secondaryClasses}`;

  if (href) {
    return (
      <Link href={href} rel={rel} target={target} passHref className={buttonClasses} onClick={onClick}>
        {label}
        {icon && <span className="ml-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button
      type={buttonType}
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}
    >
      {label}
      {icon && <span className="ml-4">{icon}</span>}
    </button>
  );
};

export default Button;

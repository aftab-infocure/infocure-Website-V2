import { Link } from "react-router-dom";

const sizeClasses = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-[15px]",
  lg: "h-14 px-8 text-[16px]",
};

const variantClasses = {
  primary: "ic-btn-primary",
  secondary: "ic-btn-secondary",
  "secondary-on-dark": "ic-btn-secondary ic-btn-secondary-on-dark",
  ghost: "font-body font-semibold text-brand-ink hover:text-brand-red transition-colors",
  link: "font-body font-semibold text-brand-red underline-offset-4 hover:underline",
};

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function Button({ variant = "primary", size = "md", className, children, href, ...rest }) {
  const classes = cx(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button",
    sizeClasses[size],
    variantClasses[variant],
    className
  );
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

const badgeTones = {
  default: "bg-brand-tint text-brand-ink",
  red: "bg-brand-red/10 text-brand-red",
  ink: "bg-brand-ink text-white",
  cloud: "bg-brand-cloud text-brand-slate",
  "on-dark": "bg-white/10 text-white/90 backdrop-blur",
};

export function Badge({ tone = "default", className, children, ...rest }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-chip px-3 py-1 font-body text-[12px] font-medium uppercase tracking-[0.08em]",
        badgeTones[tone] || badgeTones.default,
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

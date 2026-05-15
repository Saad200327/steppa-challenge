export default function Badge({ children, variant='green', className='' }) {
  const v = { green:'badge-green', red:'badge-red', yellow:'badge-yellow', blue:'badge-blue' }
  return <span className={`badge ${v[variant]||''} ${className}`}>{children}</span>
}

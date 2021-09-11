import React, { ReactNode } from "react"

interface LayoutProps {
  children?: ReactNode
  className?: React.HtmlHTMLAttributes<HTMLHtmlElement>["className"]
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return <div className={`${className}`}>{children}</div>
}

export default Layout

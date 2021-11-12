import { Link } from "react-router-dom"

export default function CustomFooter() {
  return (
    <>
      <div className="flex-center">
        <div className="copyright">
          Copyright © 2021 <span>MLVN</span> all rights reserved. Powered by <Link to='/profile' >HPN VN.DN</Link>
        </div>
      </div>
    </>
  )
}

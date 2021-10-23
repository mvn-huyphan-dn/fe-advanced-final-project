import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <section className='section-notfound' style={{ marginTop: '30px' }}>
        <div className='container flex-column flex-center txt-center' style={{ height: '70vh' }}>
          <h2>Oh no, you’ve found our junior developer’s homepage!</h2>
          <h2>Despite sleeping on the couch most of the day, our junior web developer still finds time to do some coding…</h2>
          <Link to='/'>
            <button className='btn btn-round' style={{ marginTop: '30px' }}>Back to Home</button>
          </Link>
        </div>
      </section>
    </>
  )
}

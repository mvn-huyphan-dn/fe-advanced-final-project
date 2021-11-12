import { Link } from "react-router-dom";
import { Result, Button } from 'antd';

export default function NotFound() {
  return (
    <div className='page-not-found flex-center'>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to='/'>
            <Button type="primary">Back to Dashboard</Button>
          </Link>}
      />
    </div>
  )
}

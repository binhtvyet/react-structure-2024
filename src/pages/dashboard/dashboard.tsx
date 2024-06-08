import React from 'react'
import { IConfig, axiosInstance } from '../../services/axios';

function Dashboard() {
  const [_, setTodos] = React.useState<any>([]);

  React.useEffect(() => {
    const config: IConfig = {
      showSpinner: true
    }
    async function fetchData() {
      const data = await axiosInstance.get('/todos?_limit=5&_page=1', config);
      setTodos(data);
    }
    fetchData();
  }, [])

  console.log(3123)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/axios'
import Loading from '../../components/admin/Loading'

function index() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["State"],
    queryFn: async () => {
      const response = await api.get("/state");

      return response.data;
    },
  })
  if (isLoading) return <Loading />
  if (error) return <div>Error: {error.message}</div>
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Admin Page</h1>
      <div className='bg-white p-4 rounded shadow mt-4 '>
        <h2 className='text-xl font-semibold'>Number of tenants:</h2>
        <p>{data.tenant_count}</p>
      </div>
    </div>
  )
}

export default index
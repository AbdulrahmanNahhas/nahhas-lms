import { getAnalytics } from '@/actions/get-analytics';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import DataCard from './_components/DataCard';
import Chart from './_components/Chart';
import { Card } from '@/components/ui/card';

const Analytics = async () => {
  const {userId} = auth();
  if(!userId) {
    return redirect("/")
  }

  const {data, totalRevenue, totalSales} = await getAnalytics(userId);
  const totalStudents = totalRevenue;

  return (
    <div className='p-6 flex flex-col items-center justify-center min-h-screen w-full'>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 w-full max-w-5xl mx-auto">
        <DataCard label='Total Sales' value={totalSales} name='Courses'/>
        <DataCard label='Total Students' value={totalStudents} name="Students"/>
        <DataCard label='Total Revenue' value={totalRevenue} shouldFormat/>
      </div>
      {!totalSales || !totalStudents ? (
        <Card className='h-[500px] w-full max-w-5xl mx-auto text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground flex items-center justify-center'>
          No Data Found
        </Card>
      ): (
        <Chart data={data} />
      )}
    </div>
  )
}

export default Analytics
import Navbar from "@/app/component/Navbar";
import BorrowedMoneyContent from "./BorrowedMoneyContent";

interface Props {
  params: Promise<{
    id: string
  }>
}

async function BorrowedMoneyPage({ params }: Props) {
  const { id } = await params
  return (
    <>
      <Navbar />
      <BorrowedMoneyContent sinkId={id} />
    </>
  )
} 

export default BorrowedMoneyPage

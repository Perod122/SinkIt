import Navbar from "@/app/component/Navbar";
import MemberBorrowsContent from "././MemberBorrowsContent";

interface Props {
  params: Promise<{
    id: string
    borrowId: string
    memberId: string
  }>
}

async function MemberBorrowsPage({ params }: Props) {
  const {id, borrowId, memberId} = await params
  return (
    <>
      <Navbar />
      <MemberBorrowsContent sinkId={id} memberId={memberId} borrowId={borrowId} />
    </>
  )
} 

export default MemberBorrowsPage
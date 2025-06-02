import Navbar from "@/app/component/Navbar";
import MemberContributionsContent from "././MemberContributionsContent";

interface Props {
  params: Promise<{
    id: string
    memberId: string
  }>
}

async function MemberContributionsPage({ params }: Props) {
  const {id, memberId} = await params
  return (
    <>
      <Navbar />
      <MemberContributionsContent sinkId={id} memberId={memberId} />
    </>
  )
} 

export default MemberContributionsPage
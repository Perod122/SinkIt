import Navbar from "@/app/component/Navbar";
import MemberContributionsContent from "././MemberContributionsContent";

interface Props {
  params: {
    id: string
    memberId: string
  }
}

export default function MemberContributionsPage({ params }: Props) {
  return (
    <>
      <Navbar />
      <MemberContributionsContent sinkId={params.id} memberId={params.memberId} />
    </>
  )
} 
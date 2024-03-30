import { Card, Dialog } from '@material-tailwind/react'
import CreatingForm from '../shared/CreatingForm'

const UserCreateModal = ({ open, setIsOpen }) => {
  return (
    <Dialog
      handler={() => setIsOpen((s) => !s)}
      open={open}
      className="w-full shadow-none"
      size="lg"
    >
      <Card className="w-full rounded-md">
        <CreatingForm setIsOpen={setIsOpen} />
      </Card>
    </Dialog>
  )
}

export default UserCreateModal

import { Card, Dialog } from '@material-tailwind/react'
import CreatingForm from './CreatingForm'

const UserCreateModal = ({ open, setIsOpen }) => {
  return (
    <Dialog open={open} className="w-full shadow-none" size="lg">
      <Card className="w-full rounded-md">
        <CreatingForm setIsOpen={setIsOpen} />
      </Card>
    </Dialog>
  )
}

export default UserCreateModal

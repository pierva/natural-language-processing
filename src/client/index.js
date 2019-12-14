import { handleSubmit } from './js/formHandler'
import { octo } from './js/app'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

const app = octo.init()

export {
    handleSubmit,
    app
}

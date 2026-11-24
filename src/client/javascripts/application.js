import {
  createAll,
  Button,
  Checkboxes,
  ErrorSummary,
  Radios,
  SkipLink
} from 'govuk-frontend'
import { initCrossServiceHeader } from '@govuk-one-login/service-header'
import cookies from './cookies.js'

cookies.init()

createAll(Button)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(Radios)
createAll(SkipLink)
initCrossServiceHeader()

import React, { PropTypes } from 'react'
import LensTest from 'lens-test'
import css from './styles.css'

const Demo = () => {
  return (
    <div className={css.demo}>
      <LensTest message={'Matthew?'} />
    </div>
  )
}

export default Demo

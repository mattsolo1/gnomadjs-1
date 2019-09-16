import React from 'react'
import PropTypes from 'prop-types'
import { withSize } from 'react-sizeme'
import styled from 'styled-components'

import { QQPlot } from '@broad/qq-plot'

const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
`

const GeneResultsQQPlot = withSize()(({ results, height, size: { width }, ...otherProps }) => {
  const dataPoints = results.filter(r => r.pval)
  conosle.log(height)
  return (
    <Wrapper>
      {!!width && (
        <QQPlot
          {...otherProps}
          height={height}
          width={width}
          dataPoints={dataPoints}
          pointLabel={d => d.gene_name || d.gene_id}
        />
      )}
    </Wrapper>
  )
})
GeneResultsQQPlot.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }),
}
GeneResultsQQPlot.defaultProps = {
  height: 500,
}

export default GeneResultsQQPlot

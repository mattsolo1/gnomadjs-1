/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-case-declarations */

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Mousetrap from 'mousetrap'

import {
  actions as variantActions,
  selectedVariantDataset,
} from '@broad/gene-page/src/resources/variants'

import { currentGene, exonPadding, actions as activeActions } from '@broad/gene-page/src/resources/active'

import {
  ClassicExacButton,
  ClassicExacButtonFirst,
  ClassicExacButtonLast,
  ClassicExacButtonGroup,
} from '@broad/ui/src/classicExac/button'

import { Search } from '@broad/ui/src/search/simpleSearch'

let findInput

Mousetrap.bind(['command+f', 'meta+s'], (e) => {
  e.preventDefault()
  findInput.focus()
})

const GeneSettings = ({
  currentGene,
  exonPadding,
  selectedVariantDataset,
  setCurrentGene,
  setExonPadding,
  searchVariants,
  setVariantFilter,
  setSelectedVariantDataset,
}) => {
  const testGenes = [
    'PCSK9',
    'ZNF658',
    'MYH9',
    'FMR1',
    'BRCA2',
    'CFTR',
    'FBN1',
    'TP53',
    'SCN5A',
    'MYH7',
    'MYBPC3',
    'ARSF',
    'CD33',
    'DMD',
    'TTN',
    'USH2A',
  ]

  const handleDropdownChange = (gene) => {
    setCurrentGene(gene)
  }

  const setPadding = (event, newValue) => {
    const padding = Math.floor(1000 * newValue)
    setExonPadding(padding)
  }
  const geneLinks = testGenes.map(gene =>
    <a href="#" key={`${gene}-link`} onClick={() => handleDropdownChange(gene)}>{gene} </a>)

  const filterTextInputStyles = {
    hintStyle: {
      color: 'grey',
      fontSize: 12,
    },
    floatingLabelStyle: {
      color: 'black',
      fontSize: 14,
    },
    floatingLabelFocusStyle: {
      color: 'black',
      fontSize: 14,
    },
    menuItemStyle: {
      fontSize: 14
    },
  }
  const GeneSettingsContainer = styled.div`
    margin-left: 110px;
    width: 100%;
  `

  const MenusContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 950px;
  `

  const SearchContainer = styled.div`
    margin-bottom: 5px;
  `

  const ClassicVariantCategoryButtonGroup = () => (
    <ClassicExacButtonGroup>
      <ClassicExacButtonFirst onClick={() => setVariantFilter('all')}>All</ClassicExacButtonFirst>
      <ClassicExacButton onClick={() => setVariantFilter('missenseOrLoF')}>Missense + LoF</ClassicExacButton>
      <ClassicExacButtonLast onClick={() => setVariantFilter('lof')}>LoF</ClassicExacButtonLast>
    </ClassicExacButtonGroup>
  )

  return (
    <GeneSettingsContainer>
      <MenusContainer>
        <ClassicVariantCategoryButtonGroup />
        <SearchContainer>
          <Search
            listName={'search table'}
            options={['Variant ID', 'RSID', 'HGVSp']}
            placeholder={'Search variant table'}
            reference={findInput}
            onChange={searchVariants}
          />
        </SearchContainer>
        <select
          onChange={event => setSelectedVariantDataset(event.target.value)}
          value={selectedVariantDataset}
        >
          <option value="gnomadExomeVariants">gnomAD exomes</option>
          <option value="gnomadGenomeVariants">gnomAD genomes</option>
          <option value="gnomadCombinedVariants">gnomAD combined</option>
        </select>
      </MenusContainer>
    </GeneSettingsContainer>
  )
}

GeneSettings.propTypes = {
  currentGene: PropTypes.string.isRequired,
  selectedVariantDataset: PropTypes.string.isRequired,
  exonPadding: PropTypes.number.isRequired,
  setCurrentGene: PropTypes.func.isRequired,
  setExonPadding: PropTypes.func.isRequired,
  searchVariants: PropTypes.func.isRequired,
  setVariantFilter: PropTypes.func.isRequired,
  setSelectedVariantDataset: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    currentGene: currentGene(state),
    exonPadding: exonPadding(state),
    selectedVariantDataset: selectedVariantDataset(state),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentGene: geneName => dispatch(activeActions.setCurrentGene(geneName)),
    setExonPadding: padding => dispatch(activeActions.setExonPadding(padding)),
    setVariantFilter: filter => dispatch(variantActions.setVariantFilter(filter)),
    searchVariants: searchText => dispatch(variantActions.searchVariants(searchText)),
    setSelectedVariantDataset: dataset => dispatch(variantActions.setSelectedVariantDataset(dataset)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneSettings)
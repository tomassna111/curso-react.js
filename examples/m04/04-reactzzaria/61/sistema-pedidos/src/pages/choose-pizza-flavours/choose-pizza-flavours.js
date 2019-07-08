import React, { useState } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import {
  Card,
  Grid,
  Typography
} from '@material-ui/core'
import {
  CardLink,
  Divider,
  H4,
  HeaderContent,
  PizzasGrid
} from 'ui'
import { singularOrPlural } from 'utils'
import { HOME } from 'routes'

import pizzasFlavours from 'fake-data/pizzas-flavours.js'

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}))

  if (!location.state) {
    return <Redirect to={HOME} />
  }

  const { flavours, id } = location.state

  const handleChangeCheckbox = (pizzaId) => (e) => {
    console.log('checkboxes', checkboxes)
    if (
      checkboxesChecked(checkboxes).length === flavours &&
      e.target.checked === true
    ) {
      return
    }

    setCheckboxes((checkboxes) => {
      return {
        ...checkboxes,
        [pizzaId]: e.target.checked
      }
    })
  }

  return (
    <>
      <HeaderContent>
        <H4>
          Escolha até {flavours} {' '}
          {singularOrPlural(flavours, 'sabor', 'sabores')}:
        </H4>
      </HeaderContent>

      <PizzasGrid>
        {pizzasFlavours.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card>
              <Label>
                <input
                  type='checkbox'
                  checked={!!checkboxes[pizza.id]}
                  onChange={handleChangeCheckbox(pizza.id)}
                />

                <Img src={pizza.image} alt={pizza.name} />

                <Divider />

                <Typography>{pizza.name}</Typography>
                <Typography variant='h5'>
                  {pizza.value[id]}
                </Typography>
              </Label>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  )
}

ChoosePizzaFlavours.propTypes = {
  location: t.object.isRequired
}

function checkboxesChecked (checkboxes) {
  return Object.values(checkboxes).filter(Boolean)
}

const Label = styled(CardLink).attrs({
  component: 'label'
})``

const Img = styled.img`
  width: 200px;
`

export default ChoosePizzaFlavours

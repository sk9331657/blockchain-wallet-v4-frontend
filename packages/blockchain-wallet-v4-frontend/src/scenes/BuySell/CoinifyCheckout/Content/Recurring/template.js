import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Field, reduxForm } from 'redux-form'
import { equals, gt, not, prop } from 'ramda'

import { Icon, Link, Text } from 'blockchain-info-components'
import { Form, FormGroup, FormItem, CheckBox, SelectBox, DateBoxDebounced } from 'components/Form'
import { required } from 'services/FormHelper'
import moment from 'services/MomentHelper'

const RecurringWrapper = styled.div`
  position: relative;
  top: 30px;
`
const TermsWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`
const TermsLabel = styled.label`
  display: flex;
  align-items: center;
`
const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const FrequencyText = styled(Text)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 16px;
`

const isValidStartDate = current => {
  const yesterday = moment().subtract(1, 'day')
  return current.isAfter(yesterday)
}

const RecurringCheckout = props => {
  console.log('recurring template', props)
  return <RecurringWrapper>
    <TermsWrapper>
      <Field name='recurring' component={CheckBox} hideErrors />
      <TermsLabel htmlFor='recurring'>
        <Text size='13px' weight={400}>
          <FormattedMessage id='scenes.buysell.coinify.recurring.makerecurringorder' defaultMessage='Make this a recurring order' />
        </Text>
      </TermsLabel>
    </TermsWrapper>
    {
      props.showRecurring
        ? <FieldsContainer>
          <Form>
            <FormGroup inline>
              <FormItem width='50%'>
                <Text size='13px' weight={400}>
                  <FormattedMessage id='scenes.buysell.coinify.recurring.frequency' defaultMessage='Frequency:' />
                </Text>
                <Field
                  name='frequency'
                  component={SelectBox}
                  elements={props.frequencyElements}
                />
              </FormItem>
              <FrequencyText size='13px' weight={300}>
                <FormattedMessage id='scenes.buysell.coinify.recurring.frequencymessage' defaultMessage='Today and every Monday' />
              </FrequencyText>
            </FormGroup>
            <FormGroup inline>
              <FormItem width='50%'>
                <Text size='13px' weight={400}>
                  <FormattedMessage id='scenes.buysell.coinify.recurring.duration' defaultMessage='Duration:' />
                </Text>
                <Field
                  name='duration'
                  component={DateBoxDebounced}
                  // validate={[required, validStartDate]}
                  isValidDate={isValidStartDate}
                />
              </FormItem>
              <FrequencyText size='13px' weight={300}>
                <FormattedMessage id='scenes.buysell.coinify.recurring.test' defaultMessage='You can cancel anytime' />
              </FrequencyText>
            </FormGroup>
          </Form>
        </FieldsContainer>
        : null
    }
  </RecurringWrapper>
}

export const RecurringBuyCheckout = reduxForm({
  form: 'coinifyRecurring',
  destroyOnUnmount: false
})(RecurringCheckout)
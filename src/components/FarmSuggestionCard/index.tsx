import { ETHER, Fraction, Pair } from 'uniswap-bsc-sdk'
import { darken } from 'polished'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import styled from 'styled-components'

import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { ButtonSecondary } from '../Button'

import Card from '../Card'
import { AutoColumn } from '../Column'
import { RowBetween, RowFixed } from '../Row'
import { useGasBalances, useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { StyledInternalLink } from '../../theme'
import { FarmablePool } from '../../constants/bao'
import Logo from '../Logo'
import APYTooltip from '../APYTooltip'

export const FixedHeightRow = styled(RowBetween)`
	height: 24px;
`

export const HoverCard = styled(Card)`
	border: 1px solid ${({ theme }) => theme.bg2};
	:hover {
		border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
	}
`

export const BalanceText = styled(Text)`
	${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-shrink: 0;
  `};
`

interface PositionCardProps {
	pair: Pair
	farmablePool: FarmablePool
	baoPriceUsd: Fraction | undefined | null
	apy: Fraction | undefined
	showUnwrapped?: boolean
	border?: string
}

export function FarmSuggestionCard({ pair, farmablePool, apy, showUnwrapped = true, border }: PositionCardProps) {
	const { account } = useActiveWeb3React()

	const currency0 = showUnwrapped ? unwrappedToken(pair.token0) : pair.token0
	const currency1 = showUnwrapped ? unwrappedToken(pair.token1) : pair.token1

	const { token0, token1 } = pair

	const [showMore, setShowMore] = useState(false)

	const gasBalance = useGasBalances(account ? [account] : [])?.[account ?? '']

	const underlyingTokenBalance0 = useTokenBalance(account ?? undefined, token0)
	const underlyingTokenBalance1 = useTokenBalance(account ?? undefined, token1)
	const token0Balance = showUnwrapped && currency0 === ETHER ? gasBalance : underlyingTokenBalance0
	const token1Balance = showUnwrapped && currency1 === ETHER ? gasBalance : underlyingTokenBalance1

	return (
		<>
			<HoverCard border={border}>
				<AutoColumn gap="12px">
					<FixedHeightRow padding="1.5rem 0" onClick={() => setShowMore(!showMore)}>
						<RowFixed>
							<Logo
								srcs={[`images/pool-logos/${farmablePool.icon}`]}
								alt={farmablePool.name}
								style={{ width: 40, height: 40, objectFit: 'contain', margin: 10, marginLeft: 0 }}
							/>
							<AutoColumn>
								<RowFixed>
									<Text fontWeight={600} fontSize={18}>
										{farmablePool.name}
									</Text>
								</RowFixed>
								<RowFixed>
									<Text fontWeight={300} fontSize={12}>
										{farmablePool.symbol}
									</Text>
								</RowFixed>
							</AutoColumn>
						</RowFixed>
						<RowFixed>
							<AutoColumn
								gap="0.2rem"
								justify="end"
								style={{ minWidth: '5rem', alignContent: 'baseline', textAlign: 'end' }}
							>
								{apy?.greaterThan('0') && !farmablePool.isSushi && (
									<APYTooltip
										element={
											<StyledInternalLink to="/analytics">
												{apy.toFixed(2, {})}% <span style={{ flexShrink: 1, fontSize: '7pt' }}> APR</span>
											</StyledInternalLink>
										}
										text={`${apy.divide(new Fraction('1461', '4')).toFixed(2, {})}% (${apy
											.divide(new Fraction('1461', '4'))
											.divide('20')
											.toFixed(2, {})}% unlocked) per day`}
									/>
								)}
								<ButtonSecondary
									width="4.5rem"
									padding="0.2rem"
									as={Link}
									to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
								>
									<Text fontSize={14}>+Liquidity</Text>
								</ButtonSecondary>
							</AutoColumn>
						</RowFixed>
					</FixedHeightRow>
					<AutoColumn gap="4px">
						<FixedHeightRow>
							<Text color="#888D9B" fontSize={16} fontWeight={500}>
								Your {currency0.symbol}:
							</Text>
							{token0Balance ? (
								<RowFixed>
									<Text color="#888D9B" fontSize={16} fontWeight={500} marginLeft={'6px'}>
										{token0Balance.toSignificant(6)}
									</Text>
								</RowFixed>
							) : (
								'-'
							)}
						</FixedHeightRow>
						<FixedHeightRow>
							<Text color="#888D9B" fontSize={16} fontWeight={500}>
								Your {currency1.symbol}:
							</Text>
							{token1Balance ? (
								<RowFixed>
									<Text color="#888D9B" fontSize={16} fontWeight={500} marginLeft={'6px'}>
										{token1Balance.toSignificant(6)}
									</Text>
								</RowFixed>
							) : (
								'-'
							)}
						</FixedHeightRow>
					</AutoColumn>
				</AutoColumn>
			</HoverCard>
		</>
	)
}

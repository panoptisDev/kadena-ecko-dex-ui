import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import useWindowSize from '../../../hooks/useWindowSize';
import ConnectWalletModal from '../../modals/kdaModals/ConnectWalletModal';
import BellNotification from '../../right-modal-notification/BellNotification';
import AccountInfo from './AccountInfo';
import Button from '../../../components/shared/CustomButton';
import headerLinks from '../../headerLinks';
import PopupContentList from './PopupContentList';
import reduceToken from '../../../utils/reduceToken';
import SlippagePopupContent from './SlippagePopupContent';
import AccountModal from '../../modals/kdaModals/AccountModal';
import theme, { commonTheme } from '../../../styles/theme';
import { CoinKaddexIcon, ThreeDotsIcon } from '../../../assets';
import { reduceBalance } from '../../../utils/reduceBalance';
import Label from '../../shared/Label';
import {
  useRightModalContext,
  useAccountContext,
  usePactContext,
  useGameEditionContext,
  useModalContext,
  useNotificationContext,
} from '../../../contexts';
import CustomButton from '../../../components/shared/CustomButton';
import NotificationList from '../../right-modal-notification/NotificationList';
import { CHAIN_ID } from '../../../constants/contextConstants';
import { pactFetchLocal } from '../../../api/pact';

const RightContainerHeader = styled.div`
  display: flex;
  align-items: center;
  & > * {
    z-index: 10;
  }
  & > *:not(:last-child) {
    margin-right: 14px;
  }

  .fadeOut {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 1s, opacity 1s linear;
  }
  .fadeIn {
    visibility: visible;
    opacity: 1;
    transition: opacity 1s linear;
  }

  svg.menu-icon {
    path {
      fill: ${({ theme: { colors } }) => colors.white};
    }
  }
`;

const FadeContainer = styled.div``;

const RightHeaderItems = () => {
  const { pathname } = useLocation();
  const [width] = useWindowSize();

  const { tokensUsdPrice, networkCongested } = usePactContext();
  const { account } = useAccountContext();
  const { notificationList, removeAllNotifications } = useNotificationContext();
  const modalContext = useModalContext();
  const { gameEditionView, openModal } = useGameEditionContext();
  const rightModalContext = useRightModalContext();

  return (
    <RightContainerHeader>
      {width >= theme.mediaQueries.desktopPixel && (
        <div className="flex align-ce">
          <CoinKaddexIcon className="kaddex-price" style={{ marginRight: 8 }} />
          <Label outGameEditionView fontSize={13} className="mainnet-chain-2">
            $ {tokensUsdPrice?.KDX || '-'}
          </Label>
        </div>
      )}

      <Label outGameEditionView fontSize={13} class1Name="mainnet-chain-2 desktop-only">{`Chain ${CHAIN_ID}`}</Label>
      {account?.account && width >= commonTheme.mediaQueries.desktopPixel && (
        <AccountInfo
          onClick={() => {
            if (gameEditionView) {
              return openModal({
                title: 'Account',
                content: <AccountModal pathname={pathname} />,
              });
            } else {
              modalContext.openModal({
                title: 'Account',
                content: <AccountModal pathname={pathname} />,
              });
            }
          }}
          account={account.account ? `${reduceToken(account.account)}` : 'KDA'}
          balance={account.account ? `${reduceBalance(account.balance)} KDA` : ''}
        />
      )}

      {!account.account && (
        <FadeContainer className="mobile-none" style={{ display: gameEditionView && 'none' }}>
          <Button
            hover={true}
            buttonStyle={{ padding: '10px 16px' }}
            fontSize={14}
            onClick={() => {
              if (gameEditionView) {
                return openModal({
                  title: account?.account ? 'wallet connected' : 'connect wallet',
                  description: account?.account ? `Account ID: ${reduceToken(account.account)}` : '',
                  content: <ConnectWalletModal />,
                });
              } else {
                return modalContext.openModal({
                  title: account?.account ? 'wallet connected' : 'connect wallet',
                  description: account?.account ? `Account ID: ${reduceToken(account.account)}` : '',
                  content: <ConnectWalletModal />,
                });
              }
            }}
          >
            Connect Wallet
          </Button>
        </FadeContainer>
      )}

      <SlippagePopupContent className="header-item w-fit-content" hasNotification={networkCongested} />

      {account?.account && (
        <BellNotification
          hasNotification={notificationList?.some((notif) => notif.isRead === false)}
          onClick={() => {
            rightModalContext.openModal({
              title: 'notifications',
              titleStyle: { padding: '10px 22px 10px 26px' },
              isNotificationModal: true,
              content: <NotificationList />,
              footer: (
                <CustomButton
                  onClick={() => {
                    removeAllNotifications();
                  }}
                  fontSize="12px"
                  buttonStyle={{ width: '100%' }}
                  outGameEditionView
                >
                  Remove All Notification
                </CustomButton>
              ),
            });
          }}
        />
      )}
      <PopupContentList
        icon={<ThreeDotsIcon className="menu-icon" />}
        items={headerLinks}
        disableUnderline
        className="w-fit-content align-ce"
        viewOtherComponents
        withLogout
        PopupContentListStyle={{ minWidth: 120, whiteSpace: 'nowrap' }}
      />
    </RightContainerHeader>
  );
};

export default RightHeaderItems;

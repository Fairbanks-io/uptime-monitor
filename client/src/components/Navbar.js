import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../contexts/AuthContext'
import CreateMonitor from './Monitor/CreateMonitor.js'
import CreateNotification from './Notification/CreateNotification.js'

import {
  Button,
  Flex,
  Box,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

function UserDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, logout } = useContext(AuthContext)
  const btnRef = React.useRef()

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="purple"
        variant="outline"
        onClick={onOpen}
        size="sm"
      >
        {user.username}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Uptime Monitors</DrawerHeader>
          <DrawerBody>
            <CreateMonitor />
          </DrawerBody>
          <hr />
          <DrawerHeader>Notification Agents</DrawerHeader>
          <DrawerBody>
            <CreateNotification />
          </DrawerBody>
          <DrawerFooter>
            <Text
              fontSize="xs"
              style={{
                marginRight: '60px',
                marginTop: '2.5px',
                color: '#484B51',
              }}
            >
              Uptime Monitor &copy; {new Date().getFullYear()} - v
              {process.env.REACT_APP_VERSION}
            </Text>
            <Button
              variant="ghost"
              colorScheme="pink"
              mr={3}
              onClick={function () {
                setTimeout(() => {
                  logout()
                }, 1000)
              }}
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function Navbar() {
  return (
    <div className="header">
      <Flex>
        <Box p="4">
          <a href="/dashboard" className="header-link">
            <FontAwesomeIcon
              icon={faNetworkWired}
              className="header-logo"
              size="lg"
            />
            Uptime Monitor
          </a>
        </Box>
        <Spacer />
        <Box p="4">{UserDrawer()}</Box>
      </Flex>
    </div>
  )
}
export default Navbar

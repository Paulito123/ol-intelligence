import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '~/utils/classes'
import { Link, useMatches } from '@remix-run/react'

const Logo = () => {
  return (<svg width="32" height="32" viewBox="0 0 405 406" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M200.068 13V206.292V399.618" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
    <path d="M199.167 206.292H9.21478" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
    <path d="M199.165 206.292L65.838 342.993" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
    <path d="M199.165 206.293L65.838 69.6251" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
    <path d="M199.167 206.292L125.538 383.616" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
    <path d="M199.168 206.293L25.1849 129.323" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
    <path d="M199.167 206.292L22.6783 277.248" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
    <path d="M199.165 206.293L131.583 26.4973" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
    <path d="M202.508 392.969C307.268 392.969 392.192 308.045 392.192 203.285C392.192 98.5251 307.268 13.6004 202.508 13.6004C97.748 13.6004 12.8233 98.5251 12.8233 203.285C12.8233 308.045 97.748 392.969 202.508 392.969Z" stroke="white" stroke-width="25.2469" stroke-miterlimit="10"/>
  </svg>
  )
}

const useNavigation = () => {
    const matches = useMatches();
    const current = matches[matches.length -1];

    const navigation = [
        { name: 'Tokenomics', href: '/tokenomics', active: true },
        { name: 'Payments', href: '/payments', active: false },
      ].map(link => ({ ...link, active: link.href === current.pathname }))

      return navigation;
}

export default function Main({ children }: any) {
    const navigation = useNavigation();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-primary-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <Logo />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.active
                              ? 'border-gray-100 text-gray-100'
                              : 'border-transparent text-gray-100 hover:border-gray-200 hover:text-gray-200',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          aria-current={item.active ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.active
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={item.active ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          {children}
        </div>
      </div>
    </>
  )
}

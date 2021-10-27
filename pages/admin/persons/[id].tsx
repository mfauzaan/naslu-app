import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/react/solid'
import NestedLayout from '../../../components/nested-layout'
import Layout from '../../../components/layout'
import { useApi } from '../../../contexts/api'
import { useRouter } from 'next/router'
import { Spinner } from '../../../components/spinner'
import moment from 'moment'
import { capitalize }  from 'lodash'
import Link from 'next/link'

const eventTypes = {
  male: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  female: { icon: UserIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
  {
    id: 1,
    gender: eventTypes.male,
    content: 'Mary Mohamed',
    date: 'Sep 20',
  },
  {
    id: 2,
    gender: eventTypes.female,
    content: 'Mary Mohamed',
    date: 'Sep 20',
  },
  {
    id: 3,
    gender: eventTypes.male,
    content: 'Mary Mohamed',
    date: 'Sep 20',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PersonShow() {
  const router = useRouter();
  const { api } = useApi();
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState<any>();
  const { id } = router.query
    
  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/persons/${id}`).then((resp: any) => {
        setLoading(false);
        setPerson(resp.data);
      });
    }
  }, [id]);
  
  if (!person) {
    return <Spinner />
  }

  return (
    <div>
      {/* Page header */}
      <div className="max-w-3xl mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="flex-shrink-0 h-14 w-14">
              <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gray-500">
                <span className="text-xl leading-none text-white">{person.firstName[0]}{person.lastName[0]}</span>
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{person.firstName} {person.lastName}</h1>
            <p className="text-sm font-medium text-gray-500">
              Last updated at <time dateTime="2020-08-25" className="text-gray-900">{moment(person.updatedAt).format("MMMM DD, YYYY")}</time>
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            Mark as inactive
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            Edit information
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          {/* Description list*/}
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="p-4 sm:px-6">
                <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900 mb-0">
                  Personal Information
                </h2>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">ID card number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{person.idCardNumber}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">First name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{person.firstName}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Last name </dt>
                    <dd className="mt-1 text-sm text-gray-900">{person.lastName}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-900">{capitalize(person.gender)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                    <dd className="mt-1 text-sm text-gray-900">{moment(person.dob).format("DD-MMM-YYYY")}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">About</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                      Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                      proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

        </div>

        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
              Relatives
            </h2>

            {/* Activity Feed */}
            <div className="mt-6 flow-root">
              <ul role="list" className="-mb-8">
                {timeline.map((item, itemIdx) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      {itemIdx !== timeline.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={classNames(
                              item.gender.bgColorClass,
                              'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                            )}
                          >
                            <item.gender.icon className="w-5 h-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {item.content}{' '}
                              <a href="#" className="font-medium text-gray-900">
                                {/* {item.gender} */}
                              </a>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {/* <time dateTime={item.datetime}>{item.date}</time> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-col justify-stretch">
              <Link href={`/admin/persons/create?redirectUrl=admin/persons/${person._id}`}>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add more
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

PersonShow.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
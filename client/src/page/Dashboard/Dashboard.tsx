import React, { useEffect } from 'react'
import { useAppDispatch } from "../../App/Hooks/Hooks";
import DashboardTemplate from '../../components/Templates/DashboardTemplate/DashboardTemplate'
import { getLocations } from "./../../App/Action/Action";

function Dashboard() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getLocations())
  }, [])

  return (
    <DashboardTemplate/>
  )
}

export default Dashboard;

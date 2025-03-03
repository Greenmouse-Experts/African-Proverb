import React, { useContext, useRef, useState, useEffect } from 'react';
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead, TableRow, Paper,
  Pagination, PaginationItem
} from '@mui/material';
import LeaderboardUpper from "@/components/quiz/LeaderBoard/leaderboardUpper"
import firstPosition from "@/public/icon/noto_1st-place-medal.svg";
import secondPosition from "@/public/icon/noto_2nd-place-medal.svg";
import thirdPosition from "@/public/icon/noto_3rd-place-medal.svg";
// import arrowforward from "@/public/icon/frontarrow.svg";
import star from "@/public/icon/ph_star-duotone.svg";
// import spotlight from "@/public/icon/memory_target.svg";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { ProfileContext } from "@/context/profileContext";
import { UserNotificationContext } from "@/context/userNotificationContext";
import { AuthContext } from "@/context/authContext";
import Loader from "@/components/reuse/loader";
import { formatTime } from "@/utils/utilities";
import { Avatar } from "antd";






const LeaderBoard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { leaderboard, leaderboarddetails, fetchLeaderboard, fetchLeaderboardPlayer } = useContext(UserNotificationContext);
  const { state, getPicture, fullDetails, initials } = useContext(ProfileContext);
  const fullName = `${fullDetails?.data?.profile?.first_name} ${fullDetails?.data?.profile?.last_name}`;




  const tableRef = useRef();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);




  const columns = [
    { id: 'position', label: 'Position' },
    { id: 'name', label: 'Player' },
    { id: 'score', label: 'Points' },
    { id: 'dateCompleted', label: 'Date Completed' },
  ];


  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      fetchLeaderboard()
      fetchLeaderboardPlayer()
      getPicture();
    }

  }, [])



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };


  return (

    <div className='w-[100%] md:[95%] lg:w-[80%] mb-10 flex flex-col gap-5 items-center'>
      {!isLoading ? (
        <div className="col-span-3 flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <LeaderboardUpper details={leaderboarddetails[0]} />
          <div className="w-full sm:w-[90%] ">
            <TableContainer component={Paper} ref={tableRef}>
              <Table>
                <TableHead className="bg-[#EBEBEB]">
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <h2 className="text-[#363636] text-base font-semibold">{column.label}</h2>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard &&
                    leaderboard?.map((row, index) => (
                      <TableRow
                        key={row.user}
                        id={`row-${index}`}
                        className={`transition-colors duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'} ${row.firstName + row.lastName === fullName ? 'animate-bounce' : ''}`}

                      >
                        <TableCell>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {row.userPosition}
                            {(row.userPosition === 1 || row.userPosition === 2 || row.userPosition === 3) && (
                              <>
                                {row.userPosition === 1 && <Image src={firstPosition} width={20} height={20} alt="1st" />}
                                {row.userPosition === 2 && <Image src={secondPosition} width={20} height={20} alt="2nd" />}
                                {row.userPosition === 3 && <Image src={thirdPosition} width={20} height={20} alt="3rd" />}
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

                            <Avatar size={30}
                              className="text-white bg-[#BB5D06]"
                            >
                              {row.firstName.charAt(0)}{row.lastName.charAt(0)}
                            </Avatar>


                            <h2 className="text-[#BB5D06] text-base font-semibold">{row.firstName} {row.lastName}</h2>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <Image src={star} width={20} height={20} alt="star" />
                            <span>{row.totalScore} Points</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {formatTime(row.dateCreated)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex justify-right mt-4">
              {/* {userposition !== null && (
            <div className="flex flex-col sm:flex-row items-center gap-3 cursor-pointer" onClick={scrollToUserPosition}>
              <Image src={spotlight} width={20} height={20} alt="1st" className='hidden md:block' />
              <Typography type="primary" className="cursor-pointer">
                Spotlight My Position
              </Typography>
              <Image src={arrowforward} width={20} height={20} alt="1st" className='hidden md:block' />
            </div>
          )} */}
              <Pagination
                count={Math.ceil(leaderboard.length / rowsPerPage)}
                page={page + 1}
                onChange={handleChangePage}
                color="primary"
                className="bg-[#fff]"
                variant="outlined"
                shape="rounded"
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: KeyboardDoubleArrowLeftIcon, next: KeyboardDoubleArrowRightIcon }}
                    {...item}
                  />
                )}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderBoard;


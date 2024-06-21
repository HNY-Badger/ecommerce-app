import React from 'react';
import imageOne from '../../assets/images/danila.png';
import imageTwo from '../../assets/images/ivan.png';
import imageThree from '../../assets/images/marina.png';
import TeamMember from './TeamMember';

const members = [
  {
    image: imageOne,
    github: 'HNY-Badger',
    content: `Our teamlead is Danila. He has proven himself to be a true leader, 
    always ready to help every team member. Danila wrote his first line of code four 
    years ago. He experimented with various programming languages before fully diving 
    into web development a year ago. This year, Danila is completing his studies at the 
    SSTU's branch. He not only managed to develop applications but also successfully 
    defended his thesis at the institute. Danila took on the architecture of the project, 
    worked with APIs, handled most of the tests, and developed the main pages of the application. 
    He also carefully reviewed the code of other team members and provided recommendations 
    to improve code quality. His enthusiasm and dedication inspire us to achieve new heights.`,
  },
  {
    image: imageTwo,
    github: 'PakhomovIvan',
    content: `The second member of our team is Ivan. Ivan has been working in the IT field for 
    over 6 years and has had the opportunity to work in major Russian companies such as SBER 
    and Transneft. Currently, he is fulfilling his dream of transitioning from a system administrator 
    to a front-end developer. In his free time, Ivan is passionate about technology and supports 
    the operation of his online cinema. During winter, he enjoys skiing and snowboarding. In our 
    project, Ivan has not only been involved in developing individual pages but has also taken 
    on the meticulous task of selecting and integrating all products into the eCommerce personal account. 
    His attention to detail and willingness to take on complex tasks make him a valuable asset to our 
    team.`,
  },
  {
    image: imageThree,
    github: 'marinrika',
    content: `The third member of our team is Marina, who not only is the coolest granny of our 
    project but also of the entire course. Marina is a radio engineer working in the field of 
    metrology, specializing in the calibration of electrical and radio measuring instruments. 
    She has been studying web development for a year and a half and is always open to acquiring 
    new knowledge. Marina participated in the development of individual pages, writing some tests, 
    and searching for the project's design. Marina demonstrates that age is not a barrier to learning 
    and striving for new achievements. Her dedication to the project and her constant readiness to 
    take on new challenges make her a valuable asset to our team.`,
  },
];

function AllTeamMembers() {
  return (
    <>
      {members.map(({ image, github, content }) => (
        <TeamMember image={image} github={github} content={content} key={github} />
      ))}
    </>
  );
}

export default AllTeamMembers;

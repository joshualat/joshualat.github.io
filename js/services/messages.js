app.service('messages', function () {
  var messageArray = [];
  messageArray[0] = {
    category: "one",
    title: "Back-end Development",
    skills: ["Rails", "Django", "PostgreSQL", "MongoDB", "Redis"],
    details: "Hi I'm Josh! I am a Scrum Master and Full-Stack Lead Developer.<br /><br />As a BACK-END DEVELOPER, I can lead projects from start to finish. I can design, build, and maintain complete web and mobile application stacks. In the past, I've built and maintained E-commerce projects with Rails, Sinatra, PostgreSQL, Redis, and MongoDB. I've also used Python and Django in some of my projects as well.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups. Sometimes I try out new web technologies on pet projects (hint: this site uses AngularJS)"
  }
  messageArray[1] = {
    category: "two", 
    title: "Front-end Development",
    skills: ["AngularJS", "Backbone.js", "jQuery", "CoffeeScript"],
    details: "As a FRONT-END DEVELOPER, I can build dynamic user interfaces using JavaScript libraries and frameworks such as CoffeeScript, jQuery, Backbone.js, and AngularJS. In the past, I've built and maintained E-commerce projects with Bootstrap, HAML, SASS, CoffeeScript, AngularJS, and Backbone.js.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups. Sometimes I try out new web technologies on pet projects (hint: this site uses AngularJS)"
  }
  messageArray[2] = {
    category: "three",
    title: "Solution Architecture",
    skills: ["AWS", "Ansible", "Infrastructure", "Linux", "Security"],
    details: "As a SOLUTIONS ARCHITECT, I'm capable of designing and preparing a secure setup on Amazon Web Services. <br /><br />In the past, I've helped my team troubleshoot application and infrastructure problems such as those concerned with security, scaling, automation, and high-availability. I had the opportunity before to set up and maintain different databases such as PostgreSQL, MongoDB, and Redis on several E-commerce projects."
  }
  messageArray[3] = {
    category: "four",
    title: "Everything Else",
    skills: ["Scrum", "Workshops", "Training", "Research"],
    details: "As a SCRUM MASTER, I serve as a servant leader to make the Scrum team more focused and productive. I facilitate meetings, manage the documents and timelines, and help teams detect and remove blockers as early in the development cycle as possible.<br /><br />In the past, I've helped several teams finish E-commerce projects on time by tweaking existing processes and aggressively monitoring the work hours and productivity of each developer.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups."
  }

  this.messageArray = messageArray;
});
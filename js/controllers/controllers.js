app.controller("HexCtrl", function($scope) {
  $scope.data = $scope.data || {}
  $scope.data.hexHighlight = "one";

  var messageHash = {};
  messageHash["one"] = "As a BACK-END DEVELOPER, I can lead projects from start to finish. I can design, build, and maintain complete web and mobile application stacks. In the past, I've built and maintained E-commerce projects with Rails, Sinatra, PostgreSQL, Redis, and MongoDB. I've also used Python and Django in some of my projects as well.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups. Sometimes I try out new web technologies on pet projects (hint: this site uses AngularJS)";
  messageHash["two"] = "As a FRONT-END DEVELOPER, I can build dynamic user interfaces using JavaScript libraries and frameworks such as CoffeeScript, jQuery, Backbone.js, and AngularJS. In the past, I've built and maintained E-commerce projects with Bootstrap, HAML, SASS, CoffeeScript, AngularJS, and Backbone.js.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups. Sometimes I try out new web technologies on pet projects (hint: this site uses AngularJS)";
  messageHash["three"] = "As a SOLUTIONS ARCHITECT, I'm capable of designing and preparing a secure setup on Amazon Web Services. <br /><br />In the past, I've helped my team troubleshoot application and infrastructure problems such as those concerned with security, scaling, automation, and high-availability. I had the opportunity before to set up and maintain different databases such as PostgreSQL, MongoDB, and Redis on several E-commerce projects.";
  messageHash["four"] = "As a SCRUM MASTER, I serve as a servant leader to make the Scrum team more focused and productive. I facilitate meetings, manage the documents and timelines, and help teams detect and remove blockers as early in the development cycle as possible.<br /><br />In the past, I've helped several teams finish E-commerce projects on time by tweaking existing processes and aggressively monitoring the work hours and productivity of each developer.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups.";

  var messageStart = "Hi I'm Josh! I am a Scrum Master and Full-Stack Lead Developer.<br /><br />"
  var messageEnd = "<br /><br /><br />Feel free to click on the hexagon tiles or search using the filter feature :)"

  $scope.data.currentMessage = messageStart + messageHash[$scope.data.hexHighlight] + messageEnd;

  $scope.updateColored = function(category) {
    $scope.data.hexHighlight = category;
    $scope.data.currentMessage = messageStart + messageHash[$scope.data.hexHighlight] + messageEnd;
  }

  var shuffleArray = function(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  var allSkills = [
    { name: 'Ruby', category: 'one' },
    { name: 'Rails', category: 'one' },
    { name: 'Mongoid', category: 'one' },
    { name: 'PayPal Integration', category: 'one' },
    { name: 'Ohm', category: 'one' },
    { name: 'E-commerce', category: 'one' },
    { name: 'ActiveRecord', category: 'one' },
    { name: 'TDD', category: 'one' },
    { name: 'Rspec', category: 'one' },
    { name: 'Sinatra', category: 'one' },
    { name: 'Cuba', category: 'one' },
    { name: 'Sidekiq', category: 'one' },
    { name: 'Python', category: 'one' },
    { name: 'Django', category: 'one' },
    { name: 'PHP', category: 'one' },
    { name: 'CakePHP', category: 'one' },
    { name: 'CodeIgniter', category: 'one' },
    { name: 'Perl', category: 'one' },
    { name: 'Java', category: 'one' },
    { name: 'Bash', category: 'one' },
    { name: 'Git', category: 'one' },
    { name: 'Facebook API', category: 'one' },
    { name: 'Twitter API', category: 'one' },
    { name: 'Google API', category: 'one' },
    { name: 'Mercurial', category: 'one' },
    { name: 'Backbone.js', category: 'two' },
    { name: 'Bower', category: 'two' },
    { name: 'AngularJS', category: 'two' },
    { name: 'CoffeeScript', category: 'two' },
    { name: 'JavaScript', category: 'two' },
    { name: 'Underscore.js', category: 'two' },
    { name: 'jQuery', category: 'two' },
    { name: 'Bootstrap', category: 'two' },
    { name: 'CSS', category: 'two' },
    { name: 'SASS', category: 'two' },
    { name: 'Google Analytics', category: 'two' },
    { name: 'Facebook Analytics', category: 'two' },
    { name: 'MongoDB', category: 'three' },
    { name: 'Redis', category: 'three' },
    { name: 'PostgreSQL', category: 'three' },
    { name: 'AWS', category: 'three' },
    { name: 'AWS VPC', category: 'three' },
    { name: 'Linux', category: 'three' },
    { name: 'Unix Shell Scripting', category: 'three' },
    { name: 'High Availability', category: 'three' },
    { name: 'Scaling', category: 'three' },
    { name: 'Infrastructure', category: 'three' },
    { name: 'Security', category: 'three' },
    { name: 'Disaster Recovery', category: 'three' },
    { name: 'DevOps', category: 'three' },
    { name: 'Ubuntu', category: 'three' },
    { name: 'VirtualBox', category: 'three' },
    { name: 'Ansible', category: 'three' },
    { name: 'Public Speaking', category: 'four' },
    { name: 'Scrum', category: 'four' },
    { name: 'Scrum Master', category: 'four' },
    { name: 'Agile Methologies', category: 'four' },
    { name: 'Project Management', category: 'four' },
    { name: 'Training', category: 'four' },
    { name: 'Workshops', category: 'four' },
    { name: 'Mentoring', category: 'four' },
    { name: 'Research', category: 'four' },
    { name: 'Planning', category: 'four' },
    { name: 'iOS Development', category: 'four' },
    { name: 'XCode', category: 'four' },
    { name: 'Cocoa', category: 'four' }
  ];

  $scope.skills = shuffleArray(allSkills.concat(allSkills));
});
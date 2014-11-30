app.service('skills', function(){
  var allSkills = [
    { name: 'Ruby', category: 'one' },
    { name: 'Rails', category: 'one' },
    { name: 'Mongoid', category: 'one' },
    { name: 'PayPal Integration', category: 'one' },
    { name: 'Ohm', category: 'one' },
    { name: 'E-commerce', category: 'one' },
    { name: 'ActiveRecord', category: 'one' },
    { name: 'TDD', category: 'one' },
    { name: 'Sinatra', category: 'one' },
    { name: 'Python', category: 'one' },
    { name: 'Django', category: 'one' },
    { name: 'PHP', category: 'one' },
    { name: 'CakePHP', category: 'one' },
    { name: 'CodeIgniter', category: 'one' },
    { name: 'Java', category: 'one' },
    { name: 'Git', category: 'one' },
    { name: 'Facebook API', category: 'two' },
    { name: 'Twitter API', category: 'two' },
    { name: 'Google API', category: 'two' },
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
    { name: 'Bash', category: 'three' },
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

  this.allSkills = function(times) {
    times = times || 1;

    var output = allSkills;

    for (var i = 0; i < times; i++) {
      output = output.concat(output)
    }

    return output;
  }
});
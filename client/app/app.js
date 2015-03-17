var serversList = [];
var $serverStatuses = $('#serverStatuses'); // can't cache?

class Server {
  constructor(name) {
    this.name = name;
    this.interval;
    this.createDOM();
    this.getDetails();
  }
  getDetails() {
    $.ajax({
        url: `/api/secrets/${this.name}`,
      }).success((data) => {
        this.isAlive = data.isAlive;
        this.modDOM();
      })
      .then(() => {
        this.schedule();
      })
  }
  createDOM() {
    $('#serverStatuses').append(`<div id='${this.name}'>${this.name}</div>`);
  }
  modDOM() {
    var dom = document.getElementById(this.name);
    var $dom = $(dom)[0];
    $($dom).find('i').remove();
    if (this.isAlive) {
      $($dom).removeClass("bg-danger");
      $($dom).addClass("bg-success");
      $dom.innerHTML += `<i class="fa fa-thumbs-o-up"></i>`
    } else {
      $($dom).removeClass("bg-success");
      $($dom).addClass("bg-danger");
      $dom.innerHTML += `<i class="fa fa-exclamation-triangle"></i>`
    }

  }
  schedule() {
    this.timeout = setTimeout(() => {
      this.getDetails();
      // 10 minutes = 600000 ms
    }, 600000)
  }
}

function getServers() {
  return $.ajax({
    url: "/api/secrets",
  }).success(function(data) {
    data.forEach(function(serverName) {
      var server = new Server(serverName);
    })
  })
};


getServers();
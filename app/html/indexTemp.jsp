<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%! 
    final String cdn = System.getenv("COM_ESKO_CLOUD_CORE_CDN");
%>
<!DOCTYPE html>    
    <html lang="en">
    <head>
        <base href="/">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Logistics">
            <title>
                Innovation
            </title>
            <link rel="icon" href="https://media.glassdoor.com/sqll/262362/esko-graphics-squarelogo-1442218436098.png" type = "image/x-icon" />
            {{#each htmlWebpackPlugin.files.css}}
                <% if(cdn != null && !"none".equals(cdn)) {%>
                    <link rel="stylesheet" type="text/css" href="<%= cdn %>/innovation{{this}}"></link>
                <% } else { %>
                    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/static{{this}}"></link>
                <% } %>
            {{/each }} 
    </head>
    <body style="overflow:hidden;margin:0">
        <div id="root"><div id="loader"></div></div>
        <script>
            var root = location.protocol + '//' + location.host;
            var contextPath = "<%=request.getAttribute("contextPath")%>";
            var userNodeId = "<%=request.getAttribute("userNodeId")%>"
            var entries = [];
            var cdnPath;
            <% if(cdn != null && !"none".equals(cdn)) { %>
                var service = window.location.href.split("/")[2].split(".")[0];
                cdnPath = "<%= cdn %>" +  "/" + service;
            <% } else {%>
                cdnPath = "<%= request.getContextPath() %>/static";
                console.log(cdnPath);
            <% } %>
            entries.push("{{htmlWebpackPlugin.files.js}}");
            console.log("{{htmlWebpackPlugin.files.js}}")
            entries.forEach(function(entry) {
                var script = document.createElement("script");
                script.src = cdnPath + entry;
                document.body.appendChild(script);
            });
        </script>       
    </body>
    </html>
<table class="table">
	<tr>
		<th>brand</th>
		<th>name</th>
		<th>price</th>
	</tr>
	<% for(var i = 0; i < data.length; i++) { %>
		<tr>
			<td><%= data[i].brand %></td>
			<td><%= data[i].name %></td>
			<td><%= data[i].price %></td>
		</tr>
	<% } %>
</table>
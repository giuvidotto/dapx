Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports MySql.Data.MySqlClient
Imports System.IO
Imports System.IO.Directory
Imports System.Web
Imports System.Web.Mail
Imports System.Web.UI
Imports System.Web.UI.Page
Imports System.Web.UI.WebControls
Imports System.Web.UI.HtmlControls.HtmlInputFile

public class clsPage
    
    Inherits System.Web.UI.Page
	
	public appCodeClassEmail as new appCodeClassEmail()
	public appCodeClassValidadores as new appCodeClassValidadores()
	
	public strJSONCampos, strJSONAlerta, strNome, strInstituicao, strEmail, strTelefone, strMensagem
	
	public invalido = 0
	
	sub Page_Load(Src As Object, E As EventArgs)
		
		if(request("acao") = "enviar")then
			
			sub_valida()
			
		end if

	end sub
	
	public sub sub_valida()
	
		strJSONCampos = ""
		strJSONAlerta = ""
		strNome = replaceAjaxChars(request("cmpNome"))
		strInstituicao = replaceAjaxChars(request("cmpInstituicao"))
		strEmail = replaceAjaxChars(request("cmpEmail"))
		strTelefone = replaceAjaxChars(request("cmpTelefone"))
		strMensagem = replaceAjaxChars(request("cmpMensagem"))
		
		dim assunto = ""
			
		assunto = "Contato pelo site DAPX | " + strNome + " - " + strInstituicao
			
		dim html = "Novo contato efetuado via página de contato do site DAPX. Segue abaixo os dados:<br />"
		
		html += "<br /><b>Nome:</b> "+ strNome
		html += "<br /><b>Instituição:</b> "+ strInstituicao
		html += "<br /><b>E-mail:</b> "+ strEmail
		html += "<br /><b>Telefone:</b> "+ strTelefone
		html += "<br /><br /><b>Mensagem:</b><br />"+ strMensagem
		
		dim retorno = appCodeClassEmail.func_enviaEmailReplyTo("giuvidotto@gmail.com", strEmail, "giuvidotto@gmail.com", "giuvidotto@gmail.com", assunto, html, "sim")
						
	end sub
	
	public function formataJSON(ByVal propriedade, ByVal valor)
	
		return """" & propriedade & """:""" & valor & """"
	
	end function
	
	public function replaceAjaxChars(ByVal valor As String) As String
	
		return replace(replace(HttpUtility.UrlDecode(valor, System.Text.Encoding.Default()), "'", ""), "'", "")
	
	end function
	
			
end class
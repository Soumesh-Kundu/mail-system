<template>
    <div>

    </div>
</template>

<script setup>
onMounted(async () => {
    const code = useRoute().query.code
    const email = sessionStorage.getItem('email')
    const res = await fetch(`/api/auth/token?code=${code}`, {
        method: "POST",
        body: JSON.stringify({
            email
        })
    })
    const data = await res.json()
    sessionStorage.removeItem('email')
    sessionStorage.setItem('authToken',data.authToken)
    navigateTo('/inbox')
})
</script>

<style lang="scss" scoped></style>